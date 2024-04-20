import { COLORS, SPACE } from 'config'
import React, { useCallback } from 'react'
import { Platform, StyleSheet } from 'react-native'
import { WebView, WebViewProps } from 'react-native-webview'

export interface AppWebViewProps extends WebViewProps {
    url?: string
    content?: string
}

export const AppWebView = React.memo<AppWebViewProps>(
    ({ url, content = '', ...rest }) => {
        const generateAssetFontCss = ({
            fontFileName,
            extension = 'ttf',
        }: {
            fontFileName: string
            extension?: string
        }) => {
            const fileUri = Platform.select({
                ios: `${fontFileName}.${extension}`,
                android: `file:///android_asset/fonts/${fontFileName}.${extension}`,
            })

            return `@font-face {
                font-family: '${fontFileName}';
                src: local('${fontFileName}'), url('${fileUri}') ;
            }`
        }

        const getHtml = useCallback(() => {
            return `
        <html>
        <head>
            <style>
                ${generateAssetFontCss({
                    fontFileName: 'Rubik-Regular',
                    extension: 'ttf',
                })}
                body {
                    background-color: ${COLORS.black};
                    color: ${COLORS.theme?.interface['100']};
                    font-family: Rubik-Regular;
                }
            </style>
            <meta
                name="viewport"
                content="width=device-width, initial-scale=1"
            />
        </head>
        <body style="padding:${SPACE.lg}">
            ${content}
        </body>
        </html>
        `
        }, [content])

        return (
            <WebView
                originWhitelist={['*']}
                useWebKit
                allowsFullscreenVideo={true}
                scalesPageToFit={true}
                showsVerticalScrollIndicator={false}
                source={
                    url
                        ? { uri: url }
                        : {
                              baseUrl: '',
                              html: getHtml(),
                          }
                }
                style={[
                    style.webViewContainer,
                    {
                        backgroundColor: COLORS.black,
                    },
                ]}
                {...rest}
            />
        )
    }
)

const style = StyleSheet.create({
    webViewContainer: {
        flex: 1,
    },
})
