const { writeFileSync, mkdirSync, existsSync } = require('fs');
require('dotenv').config();

// 1. Rutas corregidas (sin el punto antes de src)
const dirPath = './src/environments';
const targetPath = `${dirPath}/environment.ts`;
const targetPathDev = `${dirPath}/environment.development.ts`;

if (!process.env['KEY_EJEMPLO']) {
  console.error('Error: KEY_EJEMPLO no está definida en el archivo .env');
  process.exit(1);
}

const envFileContent = `export const environment = {
  KEY_EJEMPLO: "${process.env['KEY_EJEMPLO']}"
};
`;

// 2. Crear el directorio si no existe
if (!existsSync(dirPath)) {
  mkdirSync(dirPath, { recursive: true });
}

// 3. Escribir los archivos
try {
  writeFileSync(targetPath, envFileContent);
  writeFileSync(targetPathDev, envFileContent);
  console.log('✅ Archivos de entorno generados correctamente.');
} catch (err) {
  console.error('Error al escribir los archivos:', err);
}
