import React, { useState } from 'react';
import Moment from 'moment';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './Invoice.css'

export default function Invoice() {
    const [startDate, setStartDate] = useState(new Date());

    const [state, setState] = useState({
        logo: '',
        companyName: 'Company name',
        personName: '',
        address: '',
        cityStateCountryPin: '',
        invoiceTitle: 'Invoice',
    })
    const { companyName , personName , address , cityStateCountryPin , invoiceTitle} = state;
    const updateState = (data) => setState((state) => ({ ...state, ...data }));
    // const [startDate, setStartDate] = useState(Moment().format('DD/MM/YYYY'));
    // this.setStartDate = startDate ? Moment(startDate).format('DD/MM/YYYY') : 'DD/MM/YYYY';

    return (
        <>
            <div className='invoiceApp'>
                <h1 className="center fs_30">React Invoice Generator</h1>

                {/* <div className="download-pdf" title="Save PDF"><a download="invoice.pdf" href="blob:https://tuanpham-dev.github.io/f5270de9-3547-4152-8fc3-f26a99d643ba"></a></div> */}
                <div className="page invoice-wrapper">
                    <div className="view flex">
                        <div className="view w-50">
                            <div className="image logo">
                                <button type="button" className="image__upload">Your Logo</button>
                                <input tabindex="-1" type="file" accept="image/*" className="image__file" autoFocus="fasle" />
                            </div>
                            <input
                                type="text"
                                className="input fs-20 bold"
                                placeholder="Your Company"
                                autoComplete='false'
                                value={companyName}
                                onChange={companyName => updateState({ companyName: companyName.target.value })} />
                            <input
                                type="text"
                                className="input fs-20 bold"
                                autoComplete='false'
                                placeholder="Your Name"
                                value={personName}
                                onChange={personName => updateState({ personName: personName.target.value })} />
                            <input
                                type="text"
                                className="input fs-20 bold"
                                autoComplete='false'
                                placeholder="Company's Address"
                                value={address}
                                onChange={address => updateState({ address: address.target.value })} />
                            <input
                                type="text"
                                className="input fs-20 bold"
                                autoComplete='false'
                                placeholder="City, State, Contry - Zip"
                                value={cityStateCountryPin}
                                onChange={cityStateCountryPin => updateState({ cityStateCountryPin: cityStateCountryPin.target.value })} />
                        </div>
                        <div className="view w-50">
                            {
                                
                                (invoiceTitle == '') ?
                                <input
                                    type="text"
                                    className="input fs-45 right bold"
                                    placeholder="Invoice"
                                    autoComplete='false'
                                    value={invoiceTitle}
                                    onChange={invoiceTitle => updateState({ invoiceTitle: invoiceTitle.target.value })} />
                                    :
                                    <div className="fs-45 right bold dark mb-5"> {invoiceTitle}  </div>
                            }
                        </div>
                    </div>
                    <div className="view flex mt-40">
                        <div className="view w-55">
                            <lable className="bold dark mb-5"> Bill To: </lable>
                            <input type="text" className="input " placeholder="Your Client's Name" value="" />
                            <input type="text" className="input " placeholder="Client's Address" value="" />
                            <input type="text" className="input " placeholder="City, State Zip" value="" />
                        </div>
                        <div className="view w-45">
                            <div className="view flex mb-5">
                                <div className="view w-40">
                                    <input type="text" className="input bold" placeholder="" value="Invoice#" />
                                </div>
                                <div className="view w-60">
                                    <input type="text" className="input " placeholder="INV-12" value="" />
                                </div>
                            </div>
                            <div className="view flex mb-5">
                                <div className="view w-40">
                                    <input type="text" className="input bold" placeholder="" value="Invoice Date" />
                                </div>
                                <div className="view w-60">
                                    <div className="react-datepicker-wrapper">
                                        <DatePicker className="input bold" selected={startDate} onChange={(date) => setStartDate(date)} dateFormat="dd/MM/yyyy" />
                                        {/* {startDate ? Moment(startDate).format('DD/MM/YYYY') : 'DD/MM/YYYY'} */}
                                    </div>
                                </div>
                            </div>
                            <div className="view flex mb-5">
                                <div className="view w-40">
                                    <input type="text" className="input bold" placeholder="" value="Due Date" />
                                </div>
                                <div className="view w-60"><div className="react-datepicker-wrapper">
                                    <DatePicker className="input bold" selected={startDate} onChange={(date) => setStartDate(date)} dateFormat="dd/MM/yyyy" />
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="view mt-30 bg-dark flex">
                        <div className="view w-48 p-4-8">
                            <input type="text" className="input white bold" placeholder="" value="Item Description" />
                        </div>
                        <div className="view w-17 p-4-8">
                            <input type="text" className="input white bold right" placeholder="" value="Qty" />
                        </div>
                        <div className="view w-17 p-4-8">
                            <input type="text" className="input white bold right" placeholder="" value="Rate" />
                        </div>
                        <div className="view w-18 p-4-8">
                            <input type="text" className="input white bold right" placeholder="" value="Amount" />
                        </div>
                    </div>
                </div>
            </div>
            <div className='container'>
                <form>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Email address</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                    </div>
                    <button type="submit" className="btn btn-primary">Do Print</button>
                </form>

            </div>
        </>
    );
}

