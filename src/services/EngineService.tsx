import EngineModel from "../models/EngineModel"
import { doGet } from "./HttpService"

const findAllEngines = async (): Promise<EngineModel[]> => {
    return doGet('/engine')
}

export { findAllEngines }