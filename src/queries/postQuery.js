import gql from "graphql-tag";

const ALL_POSTS_QUERY = gql`
  query AllReportsQuery {
    allReports(orderBy: createdAt_DESC) {
      id
      hazardType
      dangerLevel
    }
  }
`;
