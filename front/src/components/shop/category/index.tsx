import { useEffect, useState } from 'react';
import http from '../../../http_common';
import { ICategoryItem } from './types';
const CategoryPage = () => {

    const [list, setList] = useState<ICategoryItem[]>();

    const getData = async () => {
      const { data } = await http.get<ICategoryItem[]>("/api/categories/list");
      setList(data);
    };

    useEffect(() => {
        //розмонтування визивається один раз
        return () => {
          getData();
        };
    },[]);

    const data = list?.map(item => {
        return (
            <tr>
              <th scope="row">{item.id}</th>
              <td>{item.name}</td>
              <td>
                <img src={http.getUri()+item.image} width="150" />
               </td>
            </tr>
        );
    });
    return (
      <>
        <h1>Категорії</h1>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Name</th>
              <th scope="col">Image</th>
            </tr>
          </thead>
          <tbody>
            {data}
          </tbody>
        </table>
      </>
    );
}

export default CategoryPage;