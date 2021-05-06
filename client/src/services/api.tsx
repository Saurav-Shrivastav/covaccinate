import { AxiosResponse } from "axios";
import Axios from "axios";

export interface IStateObject {
  state_id: number;
  state_name: string;
}

export interface IStatesData {
  states: IStateObject[];
}

export interface IDistrictObject {
  district_id: number;
  district_name: string;
}

export interface IDistrictsData {
  districts: IDistrictObject[];
}

export interface ITableParams {
  districtId: string;
  date: string;
}

export interface ITableObject {
  center_id: number;
  name: string;
  name_l: string;
  address: string;
  address_l: string;
  state_name: string;
  state_name_l: string;
  district_name: string;
  district_name_l: string;
  block_name: string;
  block_name_l: string;
  pincode: string;
  lat: number;
  long: number;
  from: string;
  to: string;
  fee_type: string;
  fee: string;
  session_id: string;
  date: string;
  available_capacity: number;
  min_age_limit: number;
  vaccine: string;
  slots?: string[] | null;
}

export interface ITableData {
  sessions: ITableObject[];
}

export const fetchStates = async (): Promise<IStatesData> => {
  try {
    const res: AxiosResponse<IStatesData> = await Axios.get(
      "https://cdn-api.co-vin.in/api/v2/admin/location/states"
    );
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const fetchDistricts = async (
  stateId: number
): Promise<IDistrictsData> => {
  try {
    const res: AxiosResponse<IDistrictsData> = await Axios.get(
      `https://cdn-api.co-vin.in/api/v2/admin/location/districts/${stateId}`
    );
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const fetchVaccineData = async (
  options: ITableParams
): Promise<ITableData> => {
  try {
    const res: AxiosResponse<ITableData> = await Axios.get(
      `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=${options.districtId}&date=${options.date}`
    );
    return res.data;
  } catch (error) {
    throw error;
  }
};
