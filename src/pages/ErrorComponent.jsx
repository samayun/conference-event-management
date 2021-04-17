// import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Link } from 'react-router-dom'

export default function ErrorComponent({ error }) {
    return (
        <div className="text-center my-5 py-5 d-flex justify-content-center align-items-center">
            <div>
                <h2 style={{ fontSize: '1.8rem', color: 'var(--bs-danger)' }}>  Something went wrong </h2>
                <p style={{ fontSize: '1.5rem', color: 'var(--bs-info)' }}> {error?.message} </p>
                <Link to="/" className="btn btn-primary">
                    <i className="fa fa-arrow-back"></i> Go Back
                </Link>
            </div>
        </div>
    )
}
