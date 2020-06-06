/**
 * @file: index.tsx
 * @author: Paulo Alves
 * @description: define a criação da página para cadastro de ponto de coleta.
 * @version 1.0.1 (03/06/2020)
 */

import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { Map, TileLayer, Marker } from 'react-leaflet';
import axios from 'axios';
import { LeafletMouseEvent } from 'leaflet';
import api from '../../services/api';

import Dropzone from '../../components/Dropzone';

import './styles.css';

import logo from '../../assets/logo.svg';

/**
 * Responsável por atribuir um formato nas propriedades do ponto de coleta. 
 * @interface
 */
interface Item {
    id: number;
    title: string;
    image_url: string;
}

/**
 * Responsável por obter um formato nos itens da propriedade UF.
 * @interface
 */
interface IBGEUFResponse {
    sigla: string;
}

/**
 * Responsável por obter um formato nos nomes das cidades.
 * @interface
 */
interface IBGECityResponse {
    nome: string;
}

/**
 * @description retorna a criação do elementos da página de coleta.
 */
const CreatePoint = () => {
    
    const [items, setItems] = useState<Item[]>([]);
    const [ufs, setUfs] = useState<string[]>([]);
    const [cities, setCities] = useState<string[]>([]);

    const [initialPosition, setInitialPosition] = useState<[number, number]>([0, 0]);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        whatsapp: '',
    });

    const [selectedUf, setSelectedUf] = useState('0');
    const [selectedCity, setSelectedCity] = useState('0');
    const [selectedItems, setSelectedItems] = useState<number[]>([]);
    const [selectedPosition, setSelectedPosition] = useState<[number, number]>([0, 0]);
    const [selectedFile, setSelectedFile] = useState<File>();

    const history = useHistory();

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;
            
            setInitialPosition([latitude,longitude]);
        });
    }, []);
    
    useEffect(() => {
        api.get('items').then(response => {
            setItems(response.data);            
        });
    }, []);

    useEffect(() => {
        axios.get<IBGEUFResponse[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
        .then(response => {
            const ufInitials = response.data.map(uf => uf.sigla);
            setUfs(ufInitials);                       
        });
    }, []);

    useEffect(() => {
        if(selectedUf === '0'){
            return;
        }
        
        axios.get<IBGECityResponse[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`)
        .then(response => {
            const cityNames = response.data.map(city => city.nome);
            setCities(cityNames);                       
        });

    }, [selectedUf]);

    /**
     * Responsável por obter o valor referente de uf. 
     * @function
     * @name handleSelectUf
     * @param event evento para capturar a alteração do valor de um elemento html.
     */
    function handleSelectUf(event: ChangeEvent<HTMLSelectElement>) {
        const uf = event.target.value;
        setSelectedUf(uf);
    }

    /**
     * Responsável por obter o valor referente de cidade. 
     * @function
     * @name handleSelectCity
     * @param event evento para capturar a alteração do valor de um elemento html.
     */
    function handleSelectCity(event: ChangeEvent<HTMLSelectElement>) {
        const city = event.target.value;
        setSelectedCity(city);
    }

    /**
     * Responsável por inidicar no mapa o local do ponto de coleta. 
     * @function
     * @name handleMapClick
     * @param event evento para capturar a alteração do valor de um elemento html.
     */
    function handleMapClick(event: LeafletMouseEvent) {
        setSelectedPosition([
            event.latlng.lat,
            event.latlng.lng,
        ]);      
    }

    /**
     * Responsável por obter valores do ponto de coleta.
     * @function
     * @name handleInputChange
     * @param event evento para obter informações dos inputs.
     */
    function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;
        
        setFormData({ ...formData, [name]:value });
    }

    /**
     * Responsável por selecionar itens para o ponto de coleta. 
     * @function
     * @name handleSelectItem
     * @param id parâmetro para seleção de item. 
     */
    function handleSelectItem(id: number) {
        const alreadySelected = selectedItems.findIndex(item => item === id);
            
        if (alreadySelected >= 0) {
            const filteredItems = selectedItems.filter(item => item !== id);
            setSelectedItems(filteredItems);
        } else {
            setSelectedItems([ ...selectedItems, id ]);
        }       
    }
    
    /**
     * Responsável pelo envio de dados a api. 
     * @function
     * @name handleSubmit
     * @param FormEvent evento para envio de dados. 
     */
    async function handleSubmit(event: FormEvent) {
        event.preventDefault();

        const { name, email, whatsapp} = formData;
        const uf = selectedUf;
        const city = selectedCity;
        const [latitude, longitude] = selectedPosition;
        const items = selectedItems;
        
        const data = new FormData();

           data.append('name',name);
           data.append('email',email);
           data.append('whatsapp',whatsapp);
           data.append('uf',uf);
           data.append('city',city);
           data.append('latitude', String(latitude));
           data.append('longitude', String(longitude));
           data.append('items',items.join(','));
           
        if (selectedFile) {
            data.append('image', selectedFile);
        }
        
        await api.post('/points', data);

        alert('Ponto de coleta criado!');

        history.push('/');
    }

    return (
        <div id="page-create-point">
            <header>
                <img src={logo} alt="Ecoleta" />
                <Link to="/">
                    <FiArrowLeft />
                    Voltar para home
                </Link>
            </header>
            <form onSubmit={handleSubmit}>
                <h1>Cadastro do <br/> ponto de coleta</h1>

                <Dropzone onFileUploaded={setSelectedFile} />                

                <fieldset>
                    <legend>
                        <h2>Dados</h2>
                    </legend>
                    <div className="field">
                        <label htmlFor="name">Nome da entidade</label>
                        <input 
                            type="text" 
                            name="name" 
                            id="name"
                            onChange={handleInputChange} 
                        />
                    </div>
                    <div className="field-group">
                        <div className="field">
                            <label htmlFor="email">E-mail</label>
                            <input 
                                type="email"
                                name="email"
                                id="email"
                                onChange={handleInputChange} 
                            />
                        </div>
                        <div className="field">
                            <label htmlFor="whatsapp">Whatsapp</label>
                            <input 
                                type="text"
                                name="whatsapp"
                                id="whatsapp"
                                onChange={handleInputChange} 
                            />
                        </div>
                    </div>
                </fieldset>

                <fieldset>
                    <legend>
                        <h2>Endereço</h2>
                        <span>Selecione o endereço no mapa</span>
                    </legend>

                    <Map center={initialPosition} zoom={15} onClick={handleMapClick}>
                        <TileLayer
                            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" 
                        />
                        <Marker position={selectedPosition} />
                    </Map>

                    <div className="field-group">
                        <div className="field">
                            <label htmlFor="uf">Estado (UF)</label>
                            <select 
                                name="uf" 
                                id="uf" 
                                value={selectedUf} 
                                onChange={handleSelectUf}>
                                <option value="0">Selecione uma UF</option>
                                {ufs.map(uf => (
                                    <option key={uf} value={uf}>{uf}</option>
                                ))}
                            </select>
                        </div>
                        <div className="field">
                            <label htmlFor="city">Cidade</label>
                            <select 
                                name="city" 
                                id="city"
                                value={selectedCity} 
                                onChange={handleSelectCity}>
                                <option value="0">Selecione uma Cidade</option>
                                {cities.map(city => (
                                    <option key={city} value={city}>{city}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </fieldset>

                <fieldset>
                    <legend>
                        <h2>Ítens de coleta</h2>
                        <span>Selecione um ou mais ítens abaixo</span>
                    </legend>

                    <ul className="items-grid">
                        {items.map(item => (
                            <li key={item.id} 
                            onClick={() => handleSelectItem(item.id)}
                            className={selectedItems.includes(item.id) ? 'selected' : ''}>
                            <img src={item.image_url} alt={item.title} />
                            <span>{item.title}</span>
                        </li>
                        ))}                        
                    </ul>
                </fieldset>

                <button type="submit">
                    Cadastrar
                </button>
            </form>
        </div>
    );
};

export default CreatePoint;