import React, {Component} from 'react';
import SeriesList from '../../components/SeriesList';
import Loader from '../../components/loader';
import Intro from '../../components/intro';

class Series extends Component{

    state ={
        series:[],
        seriesName: '',
        isFetching: false

      }
      
    
    componentDidMount(){
     
    }

    onSeriesInputChange = e =>{
        this.setState({seriesName: e.target.value, isFetching: true }); 


        fetch(`http://api.tvmaze.com/search/shows?q=${e.target.value}`)
        .then(response => response.json())
        .then(json =>this.setState({series: json, isFetching: false}))
       
    }

    render(){
        
        const {series, seriesName, isFetching} = this.state;
        
        return(
            <div>
                <Intro message='Aqui você pode encontrar informações de suas series favoritas!' />

                <div>
                    <input type="text" 
                    value={seriesName}
                    onChange={this.onSeriesInputChange} />
                </div>

                {
                    series.length === 0 && seriesName.trim() ===''
                    &&
                    <p> Entre com um nome de Serie </p>
                }

                {
                    series.length === 0 && seriesName.trim() !==''
                    &&
                    <p> Não foi encontrada nenhuma serie com este nome </p>
                }

                {
                    isFetching && <Loader/>
                }

                {
                    !isFetching &&  <SeriesList list={this.state.series}/>
                }

            
               
            
            </div>
        )

    }
}


export default Series;