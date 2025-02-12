Paso 1: Instala Node.js y npm
Antes de instalar React, necesitas tener Node.js y npm (Node Package Manager) instalados en tu sistema. Si aún no los has instalado, sigue estos pasos:

Visita la página de descargas de Node.js en: https://nodejs.org/en/download/
Descarga el instalador para tu sistema Windows (vale tanto la versión LTS como la Current, pero se recomienda la versión LTS para la mayoría de los usuarios)
Para instalar Node.js y npm, ejecuta el instalador y sigue atentamente las indicaciones proporcionadas.

Una vez completada la instalación, puedes comprobar que Node.js y npm están instalados abriendo un símbolo del sistema y ejecutando los siguientes comandos:

node -v npm -v

Estos comandos deberían mostrar los números de versión de Node.js y npm, respectivamente.

Paso 2: Instala Create React App
Create React App es una herramienta de línea de comandos que simplifica el proceso de configuración de un nuevo proyecto React con una estructura y configuración de proyecto recomendadas. Para instalar Create React App de forma global, abre un símbolo del sistema y ejecuta el siguiente comando:

npm install -g create-react-app

Este comando instala Create React App en tu sistema, haciendo que esté disponible para su uso en cualquier directorio.

Paso 3: Crea un nuevo proyecto React
Ahora que tienes Create React App instalado, puedes utilizarlo para crear un nuevo proyecto React. Para ello, abre un símbolo del sistema, dirígete al directorio en el que quieres que se aloje el proyecto y ejecuta el siguiente comando:
create-react-app my-app

Sustituye «my-app» por el nombre que desees para tu proyecto. Create React App creará un nuevo directorio con el nombre especificado y generará un nuevo proyecto React con una estructura y configuración de proyecto recomendadas.

Paso 4: Ve al directorio del proyecto e inicia el servidor de desarrollo
Una vez creado el proyecto, dirígete al directorio del proyecto ejecutando el siguiente comando en el símbolo del sistema:
cd my-app
Sustituye «my-app» por el nombre del directorio de tu proyecto. Ahora, inicia el servidor de desarrollo ejecutando el siguiente comando:
npm start

Este comando inicia el servidor de desarrollo, que vigila los cambios en los archivos de tu proyecto y recarga automáticamente el navegador cuando detecta cambios.

Debería abrirse una nueva ventana del navegador con tu aplicación React ejecutándose en http://localhost:3000/ 

Proteger una aplicacion React.js
1
Usar HTTPS
La primera y más básica forma de proteger su aplicación web React.js es utilizar HTTPS, o Protocolo de transferencia de hipertexto seguro. HTTPS encripta la comunicación entre su navegador y su servidor, lo que dificulta que los piratas informáticos intercepten, modifiquen o roben sus datos. HTTPS también le ayuda a evitar las advertencias de contenido mixto, que se producen cuando su página web carga recursos de fuentes seguras e inseguras. Para usar HTTPS, debe obtener e instalar un certificado SSL válido de una autoridad de confianza y configurar su servidor web para redirigir todas las solicitudes HTTP a HTTPS.

2
Desinfectar la entrada del usuario
Otra forma de proteger la aplicación web React.js es desinfectar la entrada del usuario o eliminar cualquier código malintencionado o no deseado que los usuarios puedan introducir en los formularios, campos o direcciones URL. La entrada del usuario puede ser una fuente de muchos ataques web, como secuencias de comandos entre sitios (XSS), inyección SQL o inyección de comandos, que pueden comprometer la funcionalidad, la seguridad o los datos de la aplicación. Para sanear la entrada del usuario, debe usar una biblioteca o una función que pueda filtrar, validar o escapar cualquier carácter o script potencialmente dañino antes de enviarlos a su servidor o procesarlos en su navegador.

3
Implementación de la autenticación y la autorización
Una tercera forma de proteger la aplicación web React.js es implementar la autenticación y la autorización, o verificar la identidad y los permisos de los usuarios. La autenticación y la autorización pueden ayudarle a controlar quién puede acceder a su aplicación, qué puede hacer y cuánto tiempo puede permanecer conectado. Para implementar la autenticación y la autorización, debe usar un servicio o una biblioteca que pueda controlar el registro de usuarios, el inicio de sesión, la administración de contraseñas, la administración de sesiones y el control de acceso basado en roles. También debe proteger sus tokens de autenticación o cookies para que no sean robados o utilizados indebidamente mediante el uso de mecanismos seguros de almacenamiento, cifrado, caducidad y revocación

4
Actualizar las dependencias
Una cuarta forma de proteger la aplicación web React.js es actualizar las dependencias o las bibliotecas y paquetes de terceros que se usan en el proyecto. Las dependencias pueden introducir vulnerabilidades de seguridad o errores en la aplicación si están desactualizadas, no son compatibles o están mal configuradas. Para actualizar las dependencias, debe usar una herramienta o un comando que pueda comprobar las versiones más recientes, la compatibilidad y los parches de seguridad de las dependencias e instalarlos en el proyecto. También debe revisar el árbol de dependencias, o la jerarquía de dependencias en la que se basa el proyecto, y eliminar las que no se utilicen o sean innecesarias

5
Usar la política de seguridad de contenido
Una quinta forma de proteger la aplicación web React.js es usar la directiva de seguridad de contenido o CSP. CSP es un estándar web que le permite especificar qué orígenes y tipos de contenido puede cargar y ejecutar su página web. CSP puede ayudarlo a prevenir ataques XSS, que ocurren cuando los piratas informáticos inyectan scripts maliciosos en su página web que pueden robar sus datos, secuestrar su sesión o redirigir a sus usuarios. Para usar CSP, debe establecer una metaetiqueta o un encabezado en el documento HTML que defina las reglas y directivas de los orígenes de contenido, como scripts, estilos, imágenes, fuentes o marcos

6
Probar el código
Una sexta y última forma de proteger la aplicación web React.js es probar el código o comprobar que el código funciona según lo previsto y no tiene errores, fallos o vulnerabilidades. Probar el código puede ayudarle a identificar y corregir cualquier problema de seguridad o fallo en la aplicación antes de que se vuelva explotable o perjudicial. Para probar el código, debe usar un marco o una herramienta que pueda realizar diferentes tipos de pruebas, como pruebas unitarias, pruebas de integración, pruebas funcionales o pruebas de penetración, y generar informes y comentarios sobre la calidad, el rendimiento y la seguridad del código