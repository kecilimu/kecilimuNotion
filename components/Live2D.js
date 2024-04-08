/* eslint-disable no-undef */
import { siteConfig } from '@/lib/config'
import { useGlobal } from '@/lib/global'
import { isMobile, loadExternalResource } from '@/lib/utils'
import { useEffect } from 'react'
import Script from 'next/script'

/**
 * 网页动画
 * @returns
 */
export default function Live2D() {
  const { theme, switchTheme } = useGlobal()
  const showPet = JSON.parse(siteConfig('WIDGET_PET'))
  const petLink = siteConfig('WIDGET_PET_LINK')

  useEffect(() => {
    if (showPet && !isMobile()) {
      Promise.all([
        loadExternalResource('https://cdn.jsdelivr.net/gh/stevenjoezhang/live2d-widget@latest/live2d.min.js', 'js')
      ]).then((e) => {
        if (typeof window?.loadlive2d !== 'undefined') {
          // https://github.com/xiazeyu/live2d-widget-models
          try {
            loadlive2d('live2d', petLink)
          } catch (error) {
            console.error('读取PET模型', error)
          }
        }
       
      })
    }
  }, [theme])

  function handleClick() {
    if (JSON.parse(siteConfig('WIDGET_PET_SWITCH_THEME'))) {
      switchTheme()
    }
  }

  if (!showPet) {
    return <></>
  }

  return (
    <>
    <canvas id="live2d" width="400" height="450" onClick={handleClick}
        className="cursor-grab"
        onMouseDown={(e) => e.target.classList.add('cursor-grabbing')}
        onMouseUp={(e) => e.target.classList.remove('cursor-grabbing')}/>
      <Script src="https://cubism.live2d.com/sdk-web/cubismcore/live2dcubismcore.min.js"/>
      <Script src="https://cdn.jsdelivr.net/npm/pixi.js@4.6.1/dist/pixi.min.js"/>
      <Script src="https://cdn.jsdelivr.net/npm/live2dv3@1.2.2/live2dv3.min.js"/>
      <Script src='https://raw.githubusercontent.com/HCLonely/Live2dV3/master/live2dv3.js'/>
      <Script
        onLoad={() => {
          new l2dViewer({
            el: document.getElementById('L2dCanvas'),
            basePath: 'https://cdn.jsdelivr.net/npm/live2dv3@latest/assets',
            modelName: 'biaoqiang_3',
            sounds: [
                'sounds/demo.mp3', // 相对路径是相对于模型文件夹
                'https://cdn.jsdelivr.net/npm/live2dv3@latest/assets/biaoqiang_3/sounds/demo.mp3' // 也可以是网址
            ]
        })
        }}
      />
    </>
  )
}
