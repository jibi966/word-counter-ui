import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  TableContainer,
  ChakraProvider,
  UnorderedList,
  ListItem,
  Input,
} from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import {
  getAllData,
  deletingData,
  handleFavorite,
  handlePostingData,
} from "../redux/actions";
import { useState } from "react";
function TableShow() {
  const dispatch = useDispatch();

  const data = useSelector((store) => store.getDataReducer.urlData);

  const [value, setValue] = useState("");

  const handleDelete = (id) => {
    dispatch(deletingData(id));
  };

  const handleEdit = (id, val) => {
    dispatch(handleFavorite(id, val));
  };

  const handlePost = () => {
    dispatch(handlePostingData(value));
  };

  return (
    <>
      <ChakraProvider>
        <br />

        <Input
          onChange={(e) => setValue(e.target.value)}
          placeholder="Paste your URL here.."
          style={{ width: "400px" }}
        />
        <br />
        <br />
        <Button onClick={handlePost}>Get Insights</Button>
        <br />
        <br />
        {data && data.length > 0 ? (
          <TableContainer>
            <Table variant="striped" colorScheme="teal">
              <Thead>
                <Tr>
                  <Th>Domain Name</Th>
                  <Th>Word Count</Th>
                  <Th>Web-Links</Th>
                  <Th>Media-Links</Th>
                  <Th>Favourite</Th>
                  <Th>Delete</Th>
                </Tr>
              </Thead>
              <Tbody>
                {data &&
                  data.map((item) => {
                    return (
                      <Tr key={item._id}>
                        <Td>{item.url}</Td>
                        <Td>{item.count}</Td>
                        <Td>
                          {item.links.length > 3 ? (
                            <UnorderedList>
                              <ListItem>
                                {item.links[0].length > 20
                                  ? item.links[0].substring(0, 20)
                                  : item.links[0]}
                                ..
                              </ListItem>
                              <ListItem>
                                {" "}
                                {item.links[1].length > 20
                                  ? item.links[1].substring(0, 20)
                                  : item.links[1]}
                                ..
                              </ListItem>
                              <ListItem>
                                {" "}
                                {item.links[2].length > 20
                                  ? item.links[2].substring(0, 20)
                                  : item.links[2]}
                                ..
                              </ListItem>
                            </UnorderedList>
                          ) : (
                            <h2>Not Found</h2>
                          )}
                        </Td>
                        <Td>
                          {item.images.length > 3 ? (
                            <UnorderedList>
                              <ListItem>
                                {item.images[0].length > 20
                                  ? item.images[0].substring(0, 20)
                                  : item.images[0]}
                                ..
                              </ListItem>
                              <ListItem>
                                {" "}
                                {item.images[1].length > 20
                                  ? item.images[1].substring(0, 20)
                                  : item.images[1]}
                                ..
                              </ListItem>
                              <ListItem>
                                {" "}
                                {item.images[2].length > 20
                                  ? item.images[2].substring(0, 20)
                                  : item.images[2]}
                                ..
                              </ListItem>
                            </UnorderedList>
                          ) : (
                            <h3>Not Found</h3>
                          )}
                        </Td>
                        <Td>
                          {" "}
                          <Button
                            onClick={() => handleEdit(item._id, item.favorite)}
                          >
                            {item.favorite === "Yes"
                              ? "Remove From Favourite"
                              : "Add To Favourite"}
                          </Button>{" "}
                        </Td>
                        <Td>
                          {" "}
                          <Button onClick={() => handleDelete(item._id)}>
                            Delete
                          </Button>{" "}
                        </Td>
                      </Tr>
                    );
                  })}
              </Tbody>
            </Table>
          </TableContainer>
        ) : (
          <h2>No History</h2>
        )}
      </ChakraProvider>
    </>
  );
}

export default TableShow;
