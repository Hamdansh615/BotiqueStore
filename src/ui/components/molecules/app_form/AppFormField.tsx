import { FONT_SIZE, scaleWithThreshold, SPACE } from 'config/Dimens'
import { FormikValues, useFormikContext } from 'formik'
import { usePreferredTheme } from 'hooks'
import EIntBoolean from 'models/enums/EIntBoolean'
import React, { useCallback, useEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import {
    AppLabel,
    AppLabelProps,
    TEXT_TYPE,
} from 'ui/components/atoms/app_label/AppLabel'
import {
    AppInputField,
    AppInputFieldProps,
} from '../appinputfield/AppInputField'
import { AppFormValidationLabel } from './AppFormValidationLabel'

export interface AppFormFieldProps {
    fieldTestID?: string
    validationLabelTestID?: string
    name: string
    readOnly?: boolean
    value?: string
    labelProps?: AppLabelProps
    fieldInputProps: AppInputFieldProps
    linkLabelProps?: AppLabelProps
    linkLabelOnPress?: () => void
    secureTextEntry?: boolean
    shouldNotOptimize?: boolean
    customTextChanged?: (value: string) => void
    isLocked?: EIntBoolean
    isFieldInHorizontalContainer?: boolean
}

type Props = AppFormFieldProps

const AppFormField = React.memo<Props>(
    ({
        name,
        labelProps,
        fieldInputProps,
        fieldTestID,
        validationLabelTestID,
        linkLabelProps,
        linkLabelOnPress,
        secureTextEntry,
        customTextChanged,
        isLocked = EIntBoolean.FALSE,
        isFieldInHorizontalContainer = false,
    }) => {
        const theme = usePreferredTheme()
        const { viewStyle, ...restFieldInputProps } = fieldInputProps
        const {
            errors,
            setFieldTouched,
            setFieldValue,
            touched,
            initialValues,
        } = useFormikContext<FormikValues>()

        const _setFieldTouched = useCallback(
            () => setFieldTouched(name),
            [setFieldTouched, name]
        )

        useEffect(() => {
            if (fieldInputProps.value) {
                setFieldValue(name, fieldInputProps.value)
                setTimeout(() => {
                    _setFieldTouched()
                }, 200)
            }
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [fieldInputProps.value])

        const getView = () => {
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
                                        color: theme.themedColors.primaryColor,
                                    },
                                    labelProps ? labelProps.style : {},
                                ]}
                            />
                            <View style={styles.space} />

                            {linkLabelProps && (
                                <TouchableOpacity onPress={linkLabelOnPress}>
                                    <AppLabel
                                        textType={TEXT_TYPE.BOLD}
                                        style={[
                                            styles.linkLabel,
                                            {
                                                color: theme.themedColors
                                                    .primaryColor,
                                            },
                                        ]}
                                        {...linkLabelProps}
                                    />
                                </TouchableOpacity>
                            )}
                        </View>
                    )}
                    <AppInputField
                        testID={fieldTestID}
                        valueToShowAtStart={initialValues[name]}
                        onChangeText={(text) => {
                            customTextChanged?.(text)
                            setFieldValue(name, text)
                            setTimeout(() => {
                                _setFieldTouched()
                            }, 50)
                        }}
                        onBlur={_setFieldTouched}
                        secureTextEntry={secureTextEntry}
                        viewStyle={[styles.inputFieldContainer, viewStyle]}
                        {...restFieldInputProps}
                        editable={!isLocked}
                    />
                    {errors[name] && touched[name] && (
                        <AppFormValidationLabel
                            validationLabelTestID={validationLabelTestID}
                            errorString={errors[name] as string}
                            shouldVisible={true}
                        />
                    )}
                </>
            )
        }

        return (
            <>
                {isFieldInHorizontalContainer ? (
                    <View style={{ flexDirection: 'column' }}>{getView()}</View>
                ) : (
                    getView()
                )}
            </>
        )
    }
)

const styles = StyleSheet.create({
    label: {
        marginBottom: SPACE._2md,
        fontSize: FONT_SIZE._3xs,
    },
    space: {
        flex: 1,
    },
    linkLabelContainer: {
        flexDirection: 'row',
    },
    linkLabel: {
        fontSize: FONT_SIZE.xs,
    },
    inputFieldContainer: { height: scaleWithThreshold(44) },
})

export default AppFormField
