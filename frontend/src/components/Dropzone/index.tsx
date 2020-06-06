/**
 * @file: index.tsx
 * @author: Paulo Alves
 * @description: componente responsável pelo envio de imagem.
 * @version 1.0.1 (06/06/2020)
 */

import React, {useCallback, useState} from 'react';
import {useDropzone} from 'react-dropzone';
import { FiUpload } from 'react-icons/fi';

import './style.css';

/**
 * Responsável por formatar propriedade na utilização de função no dropzone. 
 * @interface
 */
interface Props {
    onFileUploaded: (file: File) => void;
}

const Dropzone: React.FC<Props> = ({ onFileUploaded }) => {

    const [selectedFileUrl, setSelectedFileUrl] = useState('');

    const onDrop = useCallback(acceptedFiles => {
        const file = acceptedFiles[0];
        
        const fileUrl = URL.createObjectURL(file);

        setSelectedFileUrl(fileUrl);
        onFileUploaded(file);
    }, [onFileUploaded])

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: 'image/*'
    });

    return (
        <div className="dropzone" {...getRootProps()}>
            <input {...getInputProps()} accept="image/*" />
            { selectedFileUrl
                ? <img src={selectedFileUrl} alt="Point thumbnail" />
                : (<p><FiUpload />Imagem do estabelecimento</p>)
            }            
        </div>
    )
}

export default Dropzone;