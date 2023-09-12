import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../../provider/auth/AuthContext'
export const AboutModal = () => {
    let [pluginList, setPluginList] = useState("")
    const { line1Text, localization, pluginService } = useContext(AuthContext)
    useEffect(() => {

        pluginService.getAvailablePlugins(function (response) {
            if (response.status === 'OK') {
                setTimeout(() => {
                    let aa = response.data.map(function (plugin) {
                        return localization.localize(plugin.nameLocalizationKey)
                    }).sort();
                    setPluginList(aa.join(', '))
                }, 3000)
            }
        });

    }, [])
    return (
        <div className="modal" id="AboutController">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title">{line1Text}</h4>
                        <button type="button" className="close" data-dismiss="modal">&times;</button>
                    </div>
                    <div className="modal-body">
                        <form className='form-horizontal'>
                            <div className="text-center">
                                <h4>Launcher Enterprise para Smartpeak</h4>
                            </div>

                            <div className="text-center">
                                <h4>Version 1.0.0</h4>
                            </div>

                            <div ng-if="plugins" className="text-center margin-top-40">
                                <div>
                                    <div>
                                        <h4 >{localization.localize('about.line.4')} </h4>
                                    </div>

                                    <div className="form-group" style={{ margin: '15px' }}>{pluginList}</div>
                                </div>
                            </div>
                        </form>
                    </div>

                    <div className="modal-footer">
                        <button type="button" className="btn btn-danger" data-dismiss="modal" >{localization.localize('button.close')}</button>
                    </div>

                </div>
            </div>
        </div>
    )
}