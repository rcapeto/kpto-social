import { View, Text } from 'react-native'

import { RenderValidation } from '~/components/RenderValidation'
import { Mapper } from '~/components/Mapper'
import styles from './styles'

export interface FieldProps {
  label: string
  value: string | string[]
}

export function Field(props: FieldProps) {
  const isArray = Array.isArray(props.value)

  return (
    <View style={styles.container}>
      <View style={styles.labelContainer}>
        <Text style={styles.labelText}>{props.label}</Text>
      </View>

      <View style={styles.valueContainer}>
        <RenderValidation
          validation={isArray}
          validComponent={
            <View style={styles.itemContainer}>
              <Mapper
                items={props.value as string[]}
                keyExtractor={(item) => `${Math.random()}-${item}`}
                renderItem={({ item }) => (
                  <Text style={styles.item}>{item}</Text>
                )}
              />
            </View>
          }
          unvalidComponent={<Text style={styles.value}>{props.value}</Text>}
        />
      </View>
    </View>
  )
}
