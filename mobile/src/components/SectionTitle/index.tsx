import { useMemo } from 'react'
import { StyleProp, Text, TextStyle, View, ViewStyle } from 'react-native'

import styles from './styles'

interface SectionTitleProps {
  text: string
  containerStyle?: StyleProp<ViewStyle>
  textStyle?: StyleProp<TextStyle>
  isCenter?: boolean
}

export function SectionTitle(props: SectionTitleProps) {
  const containerStyle = useMemo(() => {
    const style: StyleProp<ViewStyle> = [styles.container, props.containerStyle]

    if (props.isCenter) {
      style.push(styles.centered)
    }

    return style
  }, [props.containerStyle, props.isCenter])

  return (
    <View style={containerStyle}>
      <Text style={[styles.text, props.textStyle]}>{props.text}</Text>
    </View>
  )
}
