import React, { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { Button, Col, DatePicker, Input, Row, Select } from "antd";
import { Option } from "antd/lib/mentions";
import { LoadingOutlined, SearchOutlined } from "@ant-design/icons";

import Layout from "components/Layout/Layout";
import {
  AvailibilityWrapper,
  SearchContainer,
} from "./VaccineAvailability.styles";
import {
  fetchDistricts,
  fetchStates,
  fetchVaccineData,
  fetchVaccineDataByZipCode,
  IStatesData,
  ITableParams,
  ITableParamsZipcode,
} from "services/api";
import Loading from "pages/Loading/Loading";
import Table from "components/Table/Table";

type IFilterOption = "district" | "zipcode";

const dateFormat = "DD-MM-YYYY";

const VaccineAvailability: React.FC = () => {
  const [filterOption, setFilterOption] = useState<IFilterOption>("district");
  const [stateOption, setStateOption] = useState<string>("");
  const [districtOption, setDistrictOption] = useState<string>("");
  const [zipcodeOption, setZipCodeOption] = useState<string>("");

  const [date, setDate] = useState<string>("");
  const { data: states, isLoading: statesLoading } = useQuery<IStatesData>(
    "state-data",
    fetchStates,
    {
      cacheTime: 10 * 60 * 1000,
      staleTime: Infinity,
    }
  );
  const {
    data: districts,
    isLoading: districtsLoading,
    mutate: districtMutation,
  } = useMutation((id: string) => fetchDistricts(parseInt(id)));

  const {
    data: tableData,
    isLoading: tableLoading,
    mutate: tableMutation,
    reset: tableReset,
  } = useMutation((options: ITableParams) => fetchVaccineData(options));

  const {
    data: tableDataZipcode,
    isLoading: tableLoadingZipcode,
    mutate: tableMutationZipcode,
    reset: tableResetZipcode,
  } = useMutation((options: ITableParamsZipcode) =>
    fetchVaccineDataByZipCode(options)
  );

  const handleChange = (value: IFilterOption) => {
    setFilterOption(value);
    if (value === "zipcode") {
      tableReset();
    } else if (value === "district") {
      tableResetZipcode();
    }
  };

  const handleStateChange = (value: string): void => {
    setStateOption(value);
    districtMutation(value);
    setDistrictOption("");
  };

  const handleDistrictChange = (value: string): void => {
    setDistrictOption(value);
  };

  // eslint-disable-unused-vars
  const onDateChange = (date: any, dateString: string): void => {
    setDate(dateString);
  };

  const searchByDistrict = () => {
    tableMutation({
      date: date,
      districtId: districtOption,
    });
  };

  const searchByZipCode = () => {
    tableMutationZipcode({
      date: date,
      zipcode: zipcodeOption,
    });
  };

  const renderSearchFields = (): JSX.Element => {
    if (filterOption === "zipcode") {
      return (
        <>
          <Input
            size="large"
            className="filter-search"
            allowClear
            placeholder="Enter a zipcode"
            value={zipcodeOption}
            onChange={(e) => {
              setZipCodeOption(e.target.value);
            }}
          />
          <DatePicker
            size="large"
            className="date-picker"
            format={dateFormat}
            onChange={onDateChange}
          />
          <Button
            type="primary"
            size="large"
            icon={<SearchOutlined />}
            onClick={searchByZipCode}
          >
            Search
          </Button>
        </>
      );
    } else {
      return (
        <>
          <Select
            id="state"
            size="large"
            className="filter-dropdown"
            value={stateOption}
            onChange={handleStateChange}
            showSearch
            filterOption={(input, option) =>
              option?.children.toLowerCase().indexOf(input.toLowerCase()) >=
                0 ||
              option?.value.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            <Option value="" disabled>
              Select a state
            </Option>
            {states?.states.map((state) => (
              <Option value={state.state_id.toString()}>
                {state.state_name}
              </Option>
            ))}
          </Select>
          <Select
            id="filter"
            size="large"
            className="filter-dropdown"
            value={districtOption}
            onChange={handleDistrictChange}
            showSearch
            filterOption={(input, option) =>
              option?.children.toLowerCase().indexOf(input.toLowerCase()) >=
                0 ||
              option?.value.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            <Option value="" disabled>
              Select a district
            </Option>
            {districtsLoading && (
              <Option value="loading" disabled>
                Fetching districts
              </Option>
            )}
            {districts?.districts.map((district) => (
              <Option value={district.district_id.toString()}>
                {district.district_name}
              </Option>
            ))}
          </Select>
          <DatePicker
            size="large"
            className="date-picker"
            format={dateFormat}
            onChange={onDateChange}
          />
          <Button
            type="primary"
            size="large"
            icon={<SearchOutlined />}
            onClick={searchByDistrict}
          >
            Search
          </Button>
        </>
      );
    }
  };

  if (statesLoading) {
    return <Loading />;
  }
  return (
    <Layout>
      <Row>
        <Col span={24}>
          <AvailibilityWrapper>
            <div className="heading-wrapper">
              <h1 className="heading">Availabilty</h1>
              <div className="cowin">
                <Button
                  type="primary"
                  size="large"
                  onClick={() => {
                    window.open("https://www.cowin.gov.in/home");
                  }}
                >
                  Open CoWin
                </Button>
              </div>
            </div>
            <SearchContainer>
              <div className="search-section">
                <Select
                  id="filter"
                  size="large"
                  className="filter-dropdown"
                  value={filterOption}
                  onChange={handleChange}
                >
                  <Option value="district">Search by district</Option>
                  <Option value="zipcode">Search by zipcode</Option>
                </Select>
                {renderSearchFields()}
              </div>
            </SearchContainer>
            {filterOption === "district" && tableLoading ? (
              <LoadingOutlined />
            ) : (
              <Table data={tableData?.sessions} />
            )}
            {filterOption === "zipcode" && tableLoadingZipcode ? (
              <LoadingOutlined />
            ) : (
              <Table data={tableDataZipcode?.sessions} />
            )}
          </AvailibilityWrapper>
        </Col>
      </Row>
    </Layout>
  );
};

export default VaccineAvailability;
