import gql from "graphql-tag";

const createReport = gql`
  mutation createReport(
    $danger: String!
    $level: String!
    $latitude: Float!
    $longitude: Float!
  ) {
    createReport(
      danger: $danger
      level: $level
      latitude: $latitude
      longitude: $longitude
    ) {
      danger
      level
      latitude
      longitude
    }
  }
`;

export default createReport;
