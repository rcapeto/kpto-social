import { useEffect, useRef } from 'react'
import { View, StyleSheet, StyleProp, ViewStyle, Animated } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'

import { useTheme } from '~/hooks/useTheme'

interface SkeletonProps {
  width: number
  height: number
  style?: StyleProp<ViewStyle>
}

export function Skeleton({ width, height, style }: SkeletonProps) {
  const { colors } = useTheme()
  const translateX = useRef(new Animated.Value(-width)).current

  useEffect(() => {
    Animated.loop(
      Animated.timing(translateX, {
        toValue: width,
        useNativeDriver: true,
        duration: 1000,
      }),
    ).start()
  }, [width])

  return (
    <View
      style={[
        {
          width,
          height,
          backgroundColor: colors.gray[600],
          overflow: 'hidden',
        },
        style,
      ]}>
      <Animated.View
        style={[
          styles.full,
          {
            transform: [{ translateX }],
          },
        ]}>
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.05)', 'transparent']}
          style={styles.full}
          start={{ x: 1, y: 1 }}
        />
      </Animated.View>
    </View>
  )
}

const styles = StyleSheet.create({
  full: {
    width: '100%',
    height: '100%',
  },
})
