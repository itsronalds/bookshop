import app from './app'
import config from './config'

app.listen(config.PORT, () => console.info(`Server running on port: ${config.PORT}`))
