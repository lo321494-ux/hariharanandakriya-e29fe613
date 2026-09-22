import { useEffect, useRef, useState } from "react";
import type { PDFDocumentLoadingTask, PDFDocumentProxy, PDFPageProxy } from "pdfjs-dist";
import pdfWorkerUrl from "pdfjs-dist/build/pdf.worker.min.mjs?url";

function PdfPage({ document, pageNumber }: { document: PDFDocumentProxy; pageNumber: number }) {
  const frameRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [page, setPage] = useState<PDFPageProxy | null>(null);

  useEffect(() => {
    let active = true;
    void document.getPage(pageNumber).then((loadedPage) => {
      if (active) setPage(loadedPage);
    });
    return () => {
      active = false;
    };
  }, [document, pageNumber]);

  useEffect(() => {
    const frame = frameRef.current;
    const canvas = canvasRef.current;
    if (!frame || !canvas || !page) return;

    let renderTask: ReturnType<PDFPageProxy["render"]> | null = null;
    const render = () => {
      const baseViewport = page.getViewport({ scale: 1 });
      const availableWidth = Math.min(frame.clientWidth, 980);
      const scale = Math.max(0.4, availableWidth / baseViewport.width);
      const viewport = page.getViewport({ scale });
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      const context = canvas.getContext("2d");
      if (!context) return;

      renderTask?.cancel();
      canvas.width = Math.floor(viewport.width * pixelRatio);
      canvas.height = Math.floor(viewport.height * pixelRatio);
      canvas.style.width = `${Math.floor(viewport.width)}px`;
      canvas.style.height = `${Math.floor(viewport.height)}px`;
      renderTask = page.render({
        canvas,
        canvasContext: context,
        viewport,
        transform: pixelRatio === 1 ? undefined : [pixelRatio, 0, 0, pixelRatio, 0, 0],
      });
      void renderTask.promise.catch((error: unknown) => {
        if (error instanceof Error && error.name !== "RenderingCancelledException") throw error;
      });
    };

    render();
    const observer = new ResizeObserver(render);
    observer.observe(frame);
    return () => {
      observer.disconnect();
      renderTask?.cancel();
      page.cleanup();
    };
  }, [page]);

  return (
    <figure ref={frameRef} className="public-pdf-page" aria-label={`Página ${pageNumber}`}>
      <canvas ref={canvasRef} />
      <figcaption>Página {pageNumber}</figcaption>
    </figure>
  );
}

export function PdfBookReader({ url, title }: { url: string; title: string }) {
  const [document, setDocument] = useState<PDFDocumentProxy | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let active = true;
    let loadingTask: PDFDocumentLoadingTask | null = null;

    void import("pdfjs-dist").then((pdfjs) => {
      pdfjs.GlobalWorkerOptions.workerSrc = pdfWorkerUrl;
      loadingTask = pdfjs.getDocument({ url });
      return loadingTask.promise;
    }).then((pdf) => {
      if (active) setDocument(pdf);
    }).catch(() => {
      if (active) setError(true);
    });

    return () => {
      active = false;
      void loadingTask?.destroy();
    };
  }, [url]);

  if (error) {
    return <p className="public-pdf-status">No fue posible cargar el libro.</p>;
  }

  if (!document) {
    return <p className="public-pdf-status">Preparando el libro completo…</p>;
  }

  return (
    <div className="public-pdf-document" aria-label={`${title}, ${document.numPages} páginas`}>
      {Array.from({ length: document.numPages }, (_, index) => (
        <PdfPage key={index + 1} document={document} pageNumber={index + 1} />
      ))}
    </div>
  );
}