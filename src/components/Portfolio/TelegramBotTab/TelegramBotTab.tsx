import React, { useState } from 'react';
import { Table, Tbody, Td, Th, Thead, Tr, Box, Text, Button, TabPanel } from "@chakra-ui/react";

const ExpandableTableRow = ({ item }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Tr>
        <Td>{item.name}</Td>
        <Td>{item.age}</Td>
        <Td>
          <Button onClick={handleToggle}>
            {isOpen ? "Collapse" : "Expand"}
          </Button>
        </Td>
      </Tr>
      {isOpen && (
        <Tr>
          <Td colSpan={3}>
            <Box p="4">
              <Text>{item.description}</Text>
            </Box>
          </Td>
        </Tr>
      )}
    </>
  );
};

const ExpandableTable = ({ data }) => {
  return (
    <Table variant="simple">
      <Thead>
        <Tr>
          <Th>Name</Th>
          <Th>Age</Th>
          <Th>Action</Th>
        </Tr>
      </Thead>
      <Tbody>
        {data.map((item, index) => (
          <ExpandableTableRow key={index} item={item} />
        ))}
      </Tbody>
    </Table>
  );
};

const TelegramBotTab = () => {
  const data = [
    { name: "John Doe", age: 30, description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." },
    { name: "Jane Smith", age: 25, description: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
    // Add more data items as needed
  ];

  return (
    <TabPanel>
      <ExpandableTable data={data} />
    </TabPanel>
  );
};

export default TelegramBotTab;
