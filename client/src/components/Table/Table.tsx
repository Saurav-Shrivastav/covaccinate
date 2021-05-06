import React from "react";
import { Col, Row, Table as Datagrid, Tag } from "antd";
import { ColumnsType } from "antd/lib/table";
import { ITableObject } from "services/api";
import { TableWrapper } from "./Table.styles";

interface IProps {
  data: ITableObject[] | undefined;
}

const columns: ColumnsType<ITableObject> = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "Pincode",
    dataIndex: "pincode",
    key: "pincode",
    responsive: ["lg"],
  },
  {
    title: "Available Capacity",
    dataIndex: "available_capacity",
    key: "available_capacity",
  },
  {
    title: "Min Age Limit",
    dataIndex: "min_age_limit",
    key: "min_age_limit",
  },
  {
    title: "Vaccine Name",
    dataIndex: "vaccine",
    key: "vaccine",
    responsive: ["lg"],
  },
  {
    title: "Slots",
    dataIndex: "slots",
    key: "slots",
    render: (slots) => (
      <>
        {slots.map((slot: string) => {
          return (
            <Tag key={slot} color="geekblue">
              {slot.toLowerCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: "Fee Type",
    dataIndex: "fee_type",
    key: "fee_type",
  },
];

const Table: React.FC<IProps> = ({ data }) => {
  if (!data) return <></>;
  return (
    <TableWrapper>
      <Row>
        <Col span={24}>
          {data.length > 0 ? (
            <Datagrid columns={columns} dataSource={data} />
          ) : (
            <h1>No Slots Available</h1>
          )}
        </Col>
      </Row>
    </TableWrapper>
  );
};

export default Table;
