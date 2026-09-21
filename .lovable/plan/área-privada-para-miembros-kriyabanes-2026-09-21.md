# Área privada para miembros kriyabanes

## Objetivo
Crear una página nueva e independiente para estudiantes, conservando intactas todas las páginas y contenidos actuales del sitio.

## Acceso
- Añadir una pantalla de ingreso con el usuario y contraseña indicados.
- Mantener la sesión en el dispositivo para no pedir acceso en cada visita.
- Incluir cierre de sesión y mensajes claros ante datos incorrectos.
- El acceso será local y genérico, tal como se solicitó, sin base de datos ni cuentas individuales.

## Aplicación de miembros
- Crear una interfaz profesional tipo aplicación, adaptada a celular, tableta y computador.
- Añadir un panel inicial con bienvenida, resumen de la biblioteca y accesos rápidos.
- Organizar el contenido por módulos: Inicio, Audios, Biblioteca y Videos.
- Incorporar búsqueda, filtros, progreso visual y estados vacíos claros.

## Material de Google Drive
- Integrar los 17 audios públicos encontrados, con reproducción desde la página y acceso al archivo original.
- Integrar los 50 PDF públicos encontrados, agrupados y con lectura/descarga desde Google Drive.
- Preparar la sección de videos sin inventar material: el Drive compartido no contiene videos públicos actualmente y la sección lo indicará con acceso al repositorio original.
- Mantener enlaces directos al Drive como respaldo si Google restringe una vista incrustada.

## Integración con el sitio
- Añadir “Miembros” a la navegación de computador y celular.
- Añadir el enlace correspondiente en el pie de página.
- No eliminar, mover ni reescribir ningún contenido existente.
- Incluir títulos y metadatos propios para la nueva página.

## Detalles técnicos
- Nueva ruta `/miembros` con una puerta de acceso en el navegador y contenido cargado desde enlaces públicos de Google Drive.
- Credenciales genéricas comparadas localmente; esto funciona como control de acceso básico, no como seguridad privada real.
- Reproductores y visores se cargarán bajo demanda para mantener buen rendimiento.
- Validación final en celular, tableta y computador, incluyendo ingreso, reproducción, lectura, búsqueda, navegación y cierre de sesión.
