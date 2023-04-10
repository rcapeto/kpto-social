import { serverConfig } from '@config/server';

type Config = {
  isMobile?: boolean;
  imagePath: string;
  uploadFolder?: 'developers' | 'posts';
};

export function getUrlEnvironment(config: Config): string {
  const PORT = serverConfig.port;
  const isMobile = config?.isMobile ?? false;
  const folder = config?.uploadFolder ?? 'developers';
  const folderPath = `uploads_${folder}`;

  if (!config.imagePath) {
    return '';
  }

  const mobilePath = `http://192.168.0.109:${PORT}/${folderPath}/${config.imagePath}`;
  const webPath = `http://localhost:${PORT}/${folderPath}/${config.imagePath}`;

  return isMobile ? mobilePath : webPath;
}
