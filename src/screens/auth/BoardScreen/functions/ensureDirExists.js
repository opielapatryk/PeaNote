import * as FileSystem from 'expo-file-system';

export async function ensureDirExists() {
    const imgDir = FileSystem.cacheDirectory + 'images/';
    const dirInfo = await FileSystem.getInfoAsync(imgDir);
    if (!dirInfo.exists) {
      await FileSystem.makeDirectoryAsync(imgDir, { intermediates: true });
    }
  }