import { useState } from 'react';
import axios from 'axios';
import './home.css';

export const Home = () => {
   const [search, setSearch] = useState('');
   const [results, setResults] = useState([]);
   const searchHandler = async (e) => {
         try {
            const res = await axios.get(`https://api.edamam.com/search?q=${search}&app_id=ed069fad&app_key=bcdd6a89cbdab82d4c86a912167b0283`)
            setResults(res.data.hits);
         } catch (err) {
            console.log(err.message);
         }
   }

   if(search.length === 0) {
      results.length = 0;
   }
   return (
      <div className="container mb-5">
         <div className="row">
            <h1 className="text-center mb-3 mt-3 text-uppercase fw-bold">Recipe app</h1>
            <div className="col-12">
               <div className="mb-3 d-flex align-items-center">
                  <input type="text" className="form-control me-3" id="searchText" placeholder="Search..." onChange={e => setSearch(e.target.value)} value={search} />
                  <button className="btn btn-success" onClick={searchHandler}>Qidirish</button>
               </div>
            </div>
            {search && results.length > 0 ? (
               results.map(result => (
                  <div className="col-lg-3 col-md-4 col-sm-6 col-12 mb-4" key={result.recipe.label}>
                     <div className="card shadow rounded">
                        <div className="card-image">
                           <img src={result.recipe.image} className='img-fluid w-100' alt={result.recipe.label} />
                        </div>
                        <div className="card-body">
                           <p className="card-title text-center fw-bold">
                             {result.recipe.label}
                           </p>
                        </div>
                     </div>
                  </div>
               ))
            ): (
               <div className="col-12">
                  <div className='alert'>
                     <h3 className='text-center'>Mavjud emas</h3>
                  </div>
               </div>
            )}
         </div>
      </div>
   )
}
