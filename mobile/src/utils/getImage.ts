import { ImageSourcePropType } from 'react-native'
import { ImageObject } from '~/interfaces/entity'
import { useTheme } from '~/hooks/useTheme'

export function getImage(
  imageObj: ImageObject | undefined,
  emptyImage: string,
): ImageSourcePropType {
  const { isAndroid } = useTheme()

  if (!imageObj) {
    return {
      uri: emptyImage,
    }
  }
  const image = !isAndroid ? imageObj.web : imageObj.mobile

  return {
    uri: image || emptyImage,
  }
}
