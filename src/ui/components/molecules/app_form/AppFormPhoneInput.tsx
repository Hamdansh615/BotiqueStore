import React, { useCallback, useRef } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import {
    AppLabel,
    AppLabelProps,
    TEXT_TYPE,
} from 'ui/components/atoms/app_label/AppLabel'
import { COLORS, FONTS, FONT_SIZE, SPACE } from 'config'
import { FormikValues, useFormikContext } from 'formik'
import { AppFormValidationLabel } from 'ui/components/molecules/app_form/AppFormValidationLabel'
import PhoneInput from 'react-native-phone-input'
import { usePreferredTheme } from 'hooks'

type Props = {
    name: string
    fieldTestID?: string
    validationLabelTestID?: string
    placeholder?: string
    value?: string
    labelProps?: AppLabelProps
    linkLabelProps?: AppLabelProps
    linkLabelOnPress?: () => void
    secureTextEntry?: boolean
    shouldNotOptimize?: boolean
    customTextChanged?: (value: string) => void
    autoformat?: boolean
}

export const AppFormPhoneInput: React.FC<Props> = ({
    name,
    placeholder,
    linkLabelProps,
    linkLabelOnPress,
    customTextChanged,
    labelProps,
    autoformat = true,
    ...rest
}) => {
    const theme = usePreferredTheme()

    const { errors, setFieldTouched, setFieldValue, touched, initialValues } =
        useFormikContext<FormikValues>()

    const phoneInput = useRef<PhoneInput>(null)

    const _setFieldTouched = useCallback(
        () => setFieldTouched(name),
        [setFieldTouched, name]
    )
    return (
        <>
            {labelProps && (
                <View style={styles.linkLabelContainer}>
                    <AppLabel
                        textType={TEXT_TYPE.SEMI_BOLD}
                        {...labelProps}
                        style={[
                            styles.label,
                            {
                                color: theme.themedColors.interface['900'],
                            },
                            labelProps ? labelProps.style : {},
                        ]}
                    />
                    <View style={styles.space} />

                    {linkLabelProps && (
                        <TouchableOpacity onPress={linkLabelOnPress}>
                            <AppLabel
                                textType={TEXT_TYPE.SEMI_BOLD}
                                style={[
                                    styles.linkLabel,
                                    {
                                        color: theme.themedColors.primaryColor,
                                    },
                                ]}
                                {...linkLabelProps}
                            />
                        </TouchableOpacity>
                    )}
                </View>
            )}

            <PhoneInput
                ref={phoneInput}
                style={[
                    styles.PhoneInputCont,
                    {
                        backgroundColor: theme.themedColors.primaryBackground,
                        borderColor: theme.themedColors.borderColor,
                    },
                ]}
                textProps={{
                    placeholder: placeholder,
                    style: [
                        styles.PhoneInputTextStyle,
                        { color: COLORS.theme?.interface['900'] },
                    ],
                    placeholderTextColor: theme.themedColors.placeholderColor,
                    fontFamily: FONTS.regular,
                    fontSize: FONT_SIZE.xs,
                    allowFontScaling: false,
                }}
                flagStyle={{ marginStart: SPACE.md }}
                onPressFlag={() => null}
                initialValue={initialValues[name]}
                onChangePhoneNumber={(text: string) => {
                    setFieldValue(name, text)
                    _setFieldTouched()
                    customTextChanged?.(text)
                }}
                autoFormat={autoformat}
                {...rest}
            />
            {errors[name] && touched[name] && (
                <AppFormValidationLabel
                    errorString={errors[name] as string}
                    shouldVisible={true}
                />
            )}
        </>
    )
}

const styles = StyleSheet.create({
    nextField: {
        marginTop: SPACE.lg,
        marginBottom: SPACE.xs,
        fontSize: FONT_SIZE._2xs,
    },
    PhoneInputTextStyle: { height: 50, fontSize: FONT_SIZE.xs },
    PhoneInputCont: {
        borderWidth: 1,
        height: 44,
        width: '100%',
        borderRadius: 5,
    },
    linkLabelContainer: {
        flexDirection: 'row',
    },
    label: {
        marginBottom: SPACE.xs,
        fontSize: FONT_SIZE._2xs,
    },
    space: {
        flex: 1,
    },
    linkLabel: {
        fontSize: FONT_SIZE.xs,
    },
})
