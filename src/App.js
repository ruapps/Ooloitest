import Datatable from './Datatable';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {useState, useEffect} from 'react';
import './App.css';

const fetchData = new Promise((myResolve, myReject) => {
    let req = new XMLHttpRequest();
    req.open('GET', "./tableTestData.json");
    req.onload = function() {
    if (req.status == 200) {
      return myResolve(req.response);
    } else {
      return myReject("File not Found");
    }
  };
  req.send();
});

function App() {

  const [sortReverse,setSortReverse] = useState(false);
  const [data, setData] = useState({
    tableOne: [],
    tableTwo: [],
    tableThree: [],
});

useEffect(() => {
    fetchData.then(function (jsonData) {
        const tableOne = JSON.parse(jsonData)?.map(
            ({ person: {name, avatar}, email, role }) => ({
                name,
                avatar,
                email,
                role,
            })
        );
        const tableTwo = JSON.parse(jsonData)?.map(({ email, joiningDate, role }) => ({
            email,
            joiningDate,
            role,
        }));
        const tableThree = JSON.parse(jsonData)?.map(
            ({ person: {name, avatar}, city, joiningDate, role }) => ({
                name, 
                avatar,
                city,
                joiningDate,
                role
            })
        );
        setData({
            tableOne: tableOne,
            tableTwo: tableTwo,
            tableThree: tableThree,
        });
    });
}, []);

    const handleSort = (e) => {
    const sortedArrTableOne = data?.tableOne?.sort((a, b) => {
      return sortReverse 
        ? a[e.toLowerCase()]?.localeCompare(b[e.toLowerCase()])
        : b[e.toLowerCase()]?.localeCompare(a[e.toLowerCase()]);
    });
   
    const sortedArrTableTwo = data?.tableTwo?.sort((a, b) => {
      return sortReverse
        ? a[e.toLowerCase()]?.localeCompare(b[e.toLowerCase()])
        : b[e.toLowerCase()]?.localeCompare(a[e.toLowerCase()]);
    });
   
    const sortedArrTableThree = data?.tableThree?.sort((a, b) => {
      return sortReverse
        ? a[e.toLowerCase()]?.localeCompare(b[e.toLowerCase()])
        : b[e.toLowerCase()]?.localeCompare(a[e.toLowerCase()]);
    });
    setData((prevState) => ({
      ...prevState,
      tableOne: sortedArrTableOne,
      tableTwo: sortedArrTableTwo,
      tableThree: sortedArrTableThree,
    }));
    setSortReverse(!sortReverse)}

const tableOneColumns = [
    { name: "Name", accessor: ["name", <img src='images/profile.jpg' alt='avatar' className='me-2'/>] },
    { name: "Email", accessor: ["email"] },
    { name: "Role", accessor: [ "role"] },
];

const tableTwoColumns = [
    { name: "Email", accessor: ["email"] },
    { name: "Joining Date", accessor: ["joiningDate"] },
    { name: "Role", accessor: ["role"] },
];

const tableThreeColumns = [
    { name: "Name", accessor: ["name", <img src='images/profile.jpg' alt='avatar' className='me-2'/>]  },
    { name: "City", accessor: ["city"] },
    { name: "Joining Date", accessor: ["joiningDate"] },
    { name: "Role", accessor: ["role"] },
];

return (
    <>
        <Datatable data={data?.tableOne} columns={tableOneColumns} handleSort={handleSort}/>
        <Datatable data={data?.tableTwo} columns={tableTwoColumns} handleSort={handleSort}/>
        <Datatable data={data?.tableThree} columns={tableThreeColumns} handleSort={handleSort}/>
    </>
);
}

export default App;

