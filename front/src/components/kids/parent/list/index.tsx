import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import http from '../../../../http_common';
import { useTypedSelector } from "../../../../hooks/useTypedSelector";
import { useActions } from "../../../../hooks/useActions";
import EclipseWidget from "../../../common/eclipse";

const ParentPage = () => {
    const { list, loading } = useTypedSelector((store) => store.parent);
    const { getParents } = useActions();

    const getData = async () => {
      await getParents();
    };

    useEffect(() => {
        //розмонтування визивається один раз
        getData();
    },[]);

    const data = list?.map(item => {
        return (
            <tr key={item.id}>
              <td>
                <img src={http.defaults.baseURL+"\\files\\"+item.image} width="100"/>
              </td>
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
             <th scope="col"></th>
              <th scope="col">Id</th>
              <th scope="col">Ім'я</th>
              <th scope="col">Прізвище</th>
            </tr>
          </thead>
          <tbody>
            {data}
          </tbody>
        </table>
        {loading && <EclipseWidget />}
      </>
    );
}

export default ParentPage;