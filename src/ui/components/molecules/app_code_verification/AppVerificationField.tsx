import { COLORS, FONT_SIZE, SPACE } from 'config'
import React, { useState, FC, useEffect } from 'react'
import {
    View,
    StyleSheet,
    Text,
    ViewProps,
    StyleProp,
    TextStyle,
} from 'react-native'
import {
    CodeField,
    Cursor,
    RenderCellOptions,
    useBlurOnFulfill,
} from 'react-native-confirmation-code-field'
import { TEXT_TYPE } from 'ui/components/atoms/app_label/AppLabel'
import { AppButton, BUTTON_TYPES } from '../app_button/AppButton'

type Props = {
    CELL_COUNT?: number
    verifiedCallBack?: (string: string) => void
    showButton?: boolean
    rootStyle?: ViewProps['style']
    textInputStyle?: StyleProp<TextStyle>
    shouldShowProgressBar?: boolean
}
const AppVerificationField: FC<Props> = ({
    CELL_COUNT,
    verifiedCallBack,
    showButton,
    rootStyle,
    textInputStyle,
    shouldShowProgressBar,
}) => {
    const [value, setValue] = useState('')
    const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT! })
    const renderCell = ({ index, symbol, isFocused }: RenderCellOptions) => {
        let textChild = null
        if (symbol) {
            textChild = symbol
        } else if (isFocused) {
            textChild = <Cursor />
        }
        return (
            <>
                <Text
                    testID={`text-${index}`}
                    key={index}
                    style={[styles.cell]}
                >
                    {textChild === null ? 'X' : textChild}
                </Text>
                <View
                    style={{
                        height: '100%',
                        width: index === (CELL_COUNT ?? 0) - 1 ? 0 : 1,
                        backgroundColor: '#D4D3CE',
                    }}
                />
            </>
        )
    }

    useEffect(() => {
        if (value.length === CELL_COUNT) {
            verifiedCallBack?.(value)
        }
    }, [CELL_COUNT, value, verifiedCallBack])
    useEffect(() => {
        setTimeout(() => ref?.current?.focus(), 100)
    }, [ref])
    return (
        <>
            <View style={[styles.fieldRow]}>
                <View style={styles.codeContainer}>
                    <CodeField
                        testID="code-field"
                        ref={ref}
                        value={value}
                        onChangeText={setValue}
                        cellCount={CELL_COUNT}
                        keyboardType="number-pad"
                        textContentType="oneTimeCode"
                        renderCell={renderCell}
                        rootStyle={rootStyle}
                        textInputStyle={textInputStyle}
                    />
                </View>
            </View>
            {showButton && (
                <AppButton
                    text="VERIFY"
                    onPress={() => verifiedCallBack?.(value)}
                    buttonType={BUTTON_TYPES.NORMAL}
                    buttonStyle={styles.buttonStyle}
                    textType={TEXT_TYPE.SEMI_BOLD}
                    isDisable={value.length !== CELL_COUNT}
                    shouldShowProgressBar={shouldShowProgressBar}
                    loaderColor={COLORS.white}
                />
            )}
        </>
    )
}

const styles = StyleSheet.create({
    fieldRow: {
        width: '100%',
        alignSelf: 'center',
        alignItems: 'stretch',
        paddingVertical: SPACE.lg,
    },
    cell: {
        width: 50,
        height: 50,
        fontSize: FONT_SIZE.base,
        lineHeight: 45,
        fontWeight: '400',
        textAlign: 'center',
        color: COLORS.theme?.interface['600'],
        borderColor: '#D4D3CE',
    },
    buttonStyle: {
        borderRadius: 100,
    },
    codeContainer: {
        borderWidth: 1,
        borderColor: '#D4D3CE',
        borderRadius: 8,
        backgroundColor: COLORS.theme?.interface[100],
    },
})

export default AppVerificationField
