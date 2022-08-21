import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import http from '../../../../http_common';
import { IParentItem } from './types';
const ParentPage = () => {

    const [list, setList] = useState<IParentItem[]>();

    const getData = async () => {
      console.log("get parent---");
      const { data } = await http.get<IParentItem[]>("/");
      setList(data);
      console.log("data", data);
    };

    useEffect(() => {
        //розмонтування визивається один раз
        getData();
    },[]);

    const data = list?.map(item => {
        return (
            <tr key={item.id}>
              <th scope="row">{item.id}</th>
              <td>{item.firstName}</td>
              <td>
                {item.lastName}
               </td>
            </tr>
        );
    });
    return (
      <>
        <h1>Батьки</h1>
        <Link className='btn btn-success' to="/parent/add">Додати</Link>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Ім'я</th>
              <th scope="col">Прізвище</th>
            </tr>
          </thead>
          <tbody>
            {data}
          </tbody>
        </table>
      </>
    );
}

export default ParentPage;