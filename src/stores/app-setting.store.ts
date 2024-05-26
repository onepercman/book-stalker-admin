import { _DEV_ } from "@/config/mode.config"
import { storageKeys } from "@/config/storage.config"
import { version } from "@/config/version.config"
import { createStore } from "@/libs/valtio"
import { AppSettingModel } from "@/models/app-setting.model"
import { devtools } from "valtio/utils"

const appSettingStore = createStore(new AppSettingModel(), {
  key: storageKeys.appSettings,
})

devtools(appSettingStore, { name: "App Setting", enabled: _DEV_ })

// Auto refresh version on first load
if (typeof document !== "undefined") {
  if (appSettingStore.version !== version) {
    localStorage.clear()
    appSettingStore.updateVersion(version)
    location.reload()
  }
}

export default appSettingStore
