type DocumentPage = {
  url: string;
};

type DocumentViewerProps = {
  pages: readonly DocumentPage[];
  title: string;
};

export function DocumentViewer({ pages, title }: DocumentViewerProps) {
  return (
    <div className="document-viewer" aria-label={title}>
      {pages.map((page, index) => (
        <img
          key={page.url}
          src={page.url}
          alt={`${title}, página ${index + 1} de ${pages.length}`}
          loading={index === 0 ? "eager" : "lazy"}
        />
      ))}
    </div>
  );
}