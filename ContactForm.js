// src/ContactForm.js
import React, { useState } from 'react';
import './ContactForm.css'; // Opcional: para estilização do formulário

const ContactForm = () => {
    const [department, setDepartment] = useState('vendas');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Envia os dados para a função serverless
        const response = await fetch('/api/send-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ department, name, email, message })
        });

        if (response.ok) {
            alert('Email enviado com sucesso!');
        } else {
            alert('Falha no envio do email.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Departamento:
                <select value={department} onChange={(e) => setDepartment(e.target.value)}>
                    <option value="vendas">Vendas</option>
                    <option value="contas">Contas</option>
                    <option value="sac">SAC</option>
                    <option value="teste">Teste</option>
                </select>
            </label>
            <label>
                Nome:
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
            </label>
            <label>
                Email:
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </label>
            <label>
                Mensagem:
                <textarea value={message} onChange={(e) => setMessage(e.target.value)} required></textarea>
            </label>
            <button type="submit">Enviar</button>
        </form>
    );
};

export default ContactForm;
