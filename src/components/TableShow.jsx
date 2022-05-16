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
import { getAllData } from "../redux/actions";
import axios from "axios";
function TableShow() {
  const dispatch = useDispatch();
  const data = useSelector((store) => store.getDataReducer.urlData);
  const handleDelete = (id) => {
    axios.delete(`http://localhost:3030/remove/${id}`).then(() => {
      console.log("Deleted");
      dispatch(getAllData());
    });
  };

  const handleEdit = (id, val) => {
    let newVal;
    if (val === "No") {
      newVal = "Yes";
    } else {
      newVal = "No";
    }
    axios
      .put(`http://localhost:3030/update/${id}`, {
        favorite: newVal,
      })
      .then(() => {
        console.log("Updated");
        dispatch(getAllData());
      });
  };
  return (
    <>
      <ChakraProvider>
        <br />

        <Input placeholder="Basic usage" />
        <br />
        <br />
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
      </ChakraProvider>
    </>
  );
}

export default TableShow;
