import React from 'react'
import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native'
import {
    AppLabelProps,
    TEXT_TYPE,
} from 'ui/components/atoms/app_label/AppLabel'
import { COLORS, FONTS, FONT_SIZE } from 'config'

export interface SpannableProps {
    containerStyle?: StyleProp<ViewStyle>
    textWrapper?: StyleProp<ViewStyle>
    text: Array<string>
    appLabelProps: Array<AppLabelProps>
    numberOfLines?: number
}

type Props = SpannableProps

const MultilineSpannableText = React.memo<Props>(
    ({
        text,
        containerStyle,
        appLabelProps,
        textWrapper,
        numberOfLines = 0,
    }) => {
        const getTextStyle = (textType: TEXT_TYPE) => {
            if (textType === TEXT_TYPE.NORMAL) {
                return styles.normal
            } else if (textType === TEXT_TYPE.ITALIC) {
                return styles.italic
            } else if (textType === TEXT_TYPE.BOLD) {
                return styles.bold
            } else if (textType === TEXT_TYPE.UNDERLINE) {
                return styles.underLine
            } else if (textType === TEXT_TYPE.LINE_THROUGH) {
                return styles.lineThrough
            } else if (textType === TEXT_TYPE.SEMI_BOLD) {
                return styles.semi_bold
            } else if (textType === TEXT_TYPE.MEDIUM) {
                return styles.medium
            } else {
                return styles.normal
            }
        }
        if (
            text.length > 0 &&
            appLabelProps.length > 0 &&
            text.length === appLabelProps.length
        ) {
            return (
                <View testID={'SPANNABLE_TEXT'} style={containerStyle}>
                    <Text numberOfLines={numberOfLines} style={textWrapper}>
                        {text.map((item, index) => (
                            <Text
                                key={index}
                                style={[
                                    getTextStyle(
                                        appLabelProps[index]?.textType ??
                                            TEXT_TYPE.NORMAL
                                    ),
                                    {
                                        color: COLORS.white,
                                        fontSize: FONT_SIZE._3xs,
                                    },
                                    appLabelProps[index]?.style,
                                ]}
                                {...appLabelProps[index]}
                            >
                                {item}
                            </Text>
                        ))}
                    </Text>
                </View>
            )
        } else {
            return <View />
        }
    }
)

const styles = StyleSheet.create({
    bold: {
        fontFamily: FONTS.bold,
    },
    normal: {
        fontFamily: FONTS.regular,
    },
    medium: {
        fontFamily: FONTS.medium,
    },
    semi_bold: {
        fontFamily: FONTS.semi_bold,
    },
    italic: {
        fontStyle: 'italic',
    },
    underLine: {
        textDecorationLine: 'underline',
    },
    lineThrough: {
        textDecorationLine: 'line-through',
    },
})

export default MultilineSpannableText
