import React, { useState, useRef } from 'react';
// import Moment from 'moment';
import html2canvas from 'html2canvas';
import { jsPDF } from "jspdf";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './Invoice.css'

export default function Invoice() {
    const [startDate, setStartDate] = useState(new Date());

    const logoRef = useRef(null);

    const [state, setState] = useState({
        logo: null,
        companyName: 'Company name',
        personName: '',
        address: '',
        cityStateCountryPin: '',
        invoiceTitle: 'Invoice',
        itemList: [
            { itemName: '', qty: 0, rate: 0, amount: 0 }
        ],
    })
    const { logo, companyName, personName, address, cityStateCountryPin, invoiceTitle, itemList } = state;
    const updateState = (data) => setState((state) => ({ ...state, ...data }));
    // const [startDate, setStartDate] = useState(Moment().format('DD/MM/YYYY'));
    // this.setStartDate = startDate ? Moment(startDate).format('DD/MM/YYYY') : 'DD/MM/YYYY';

    function addNewItem() {
        itemList.push({ itemName: '', qty: 0, rate: 0, amount: 0 });
        updateState(itemList);
    }

    async function removeItem(index) {
        console.log(index)
        await delete itemList[index];
        await updateState(itemList);

        // console.log("Before Delete",itemList)
        // await state.itemList.splice(index, 1);
        // await updateState(state.itemList);
        // console.log("After Delete",itemList)
    }

    function _printInvoice() {
        const input = document.getElementById('divToPrint');
        // html2canvas(input)
        //     .then((canvas) => {
        //         const imgData = canvas.toDataURL('image/png');
        //         const pdf = new jsPDF('p', 'mm', [297, 210]);

        //         pdf.addImage(imgData, 'JPEG', 0, 0);
        //         // pdf.output('dataurlnewwindow');
        //         pdf.save("download.pdf");
        //     })
        //     ;
        var pdf = new jsPDF("p", "pt", "a4");
        pdf.addHTML(input, 15, 15, function () {
            console.log('export');
            pdf.save('web.pdf');
        });
    }

    return (
        <>
            <div className='invoiceApp'>
                <h1 className="center fs_30">React Invoice Generator</h1>
                <div className="page invoice-wrapper" id="divToPrint">
                    <div className="view flex">
                        <div className="view w-50">
                            <div className="image logo image__upload" onClick={() => {
                                logoRef.current.click()
                            }}>
                                {
                                    logo == null ?
                                        "Your Logo"
                                        :
                                        <img src={URL.createObjectURL(logo)} alt="preview image" style={{ height: 90, width: 90, 'object-fit': 'contain' }} />
                                }
                            </div>
                            <input type="file" ref={logoRef} accept="image/*" className="image__file" autoFocus="off" onChange={e => updateState({ logo: e.target.files[0] })} />
                            <input
                                type="text"
                                className="input fs-20 bold"
                                placeholder="Your Company"
                                autoComplete="off"
                                defaultValue={companyName}
                                onChange={companyName => updateState({ companyName: companyName.target.value })} />
                            <input
                                type="text"
                                className="input fs-20 bold"
                                autoComplete="off"
                                placeholder="Your Name"
                                defaultValue={personName}
                                onChange={personName => updateState({ personName: personName.target.value })} />
                            <input
                                type="text"
                                className="input fs-20 bold"
                                autoComplete="off"
                                placeholder="Company's Address"
                                defaultValue={address}
                                onChange={address => updateState({ address: address.target.value })} />
                            <input
                                type="text"
                                className="input fs-20 bold"
                                autoComplete="off"
                                placeholder="City, State, Contry - Zip"
                                defaultValue={cityStateCountryPin}
                                onChange={cityStateCountryPin => updateState({ cityStateCountryPin: cityStateCountryPin.target.value })} />
                        </div>
                        <div className="view w-50">
                            {

                                (invoiceTitle === '') ?
                                    <input
                                        type="text"
                                        className="input fs-45 right bold"
                                        placeholder="Invoice"
                                        autoComplete="off"
                                        defaultValue={invoiceTitle}
                                        onChange={invoiceTitle => updateState({ invoiceTitle: invoiceTitle.target.value })} />
                                    :
                                    <div className="fs-45 right bold dark mb-5"> {invoiceTitle}  </div>
                            }
                        </div>
                    </div>
                    <div className="view flex mt-40">
                        <div className="view w-55">
                            <div className="bold dark mb-5"> Bill To: </div>
                            <input type="text" className="input " placeholder="Your Client's Name" defaultValue="" />
                            <input type="text" className="input " placeholder="Client's Address" defaultValue="" />
                            <input type="text" className="input " placeholder="City, State Zip" defaultValue="" />
                        </div>
                        <div className="view w-45">
                            <div className="view flex mb-5">
                                <div className="view w-40">
                                    <input type="text" className="input bold" placeholder="" defaultValue="Invoice#" />
                                </div>
                                <div className="view w-60">
                                    <input type="text" className="input " placeholder="INV-12" defaultValue="" />
                                </div>
                            </div>
                            <div className="view flex mb-5">
                                <div className="view w-40">
                                    <input type="text" className="input bold" placeholder="" defaultValue="Invoice Date" />
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
                                    <input type="text" className="input bold" placeholder="" defaultValue="Due Date" />
                                </div>
                                <div className="view w-60"><div className="react-datepicker-wrapper">
                                    <DatePicker className="input bold" selected={startDate} onChange={(date) => setStartDate(date)} dateFormat="dd/MM/yyyy" />
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-30 bg-dark flex">
                        <div className="w-48 p-4-8">
                            <input type="text" className="input white bold" placeholder="" defaultValue="Item Description" />
                        </div>
                        <div className="w-17 p-4-8">
                            <input type="text" className="input white bold right" placeholder="" defaultValue="Qty" />
                        </div>
                        <div className="w-17 p-4-8">
                            <input type="text" className="input white bold right" placeholder="" defaultValue="Rate" />
                        </div>
                        <div className="w-18 p-4-8">
                            <input type="text" className="input white bold right" placeholder="" defaultValue="Amount" />
                        </div>
                    </div>

                    {
                        itemList.map((item, index) =>
                            <div key={index + ''} className="row flex m-0-12">
                                <div className="w-48 p-4-8 pb-10">
                                    <textarea className="input dark" placeholder="Enter item name/description" style={{ height: "48px !important", }} defaultValue={item.itemName} onChange={e => { itemList[index].itemName = e.target.value; updateState({ itemList }) }}></textarea>
                                </div>
                                <div className="w-17 p-4-8 pb-10">
                                    <input type="text" className="input dark right" placeholder="" defaultValue={item.qty} onChange={e => { itemList[index].qty = parseInt(e.target.value); updateState({ itemList }); }} />
                                </div>
                                <div className="w-17 p-4-8 pb-10">
                                    <input type="text" className="input dark right" placeholder="" defaultValue={item.rate} onChange={e => { itemList[index].rate = parseInt(e.target.value); updateState({ itemList }) }} />
                                </div>
                                <div className="w-18 p-4-8 pb-10">
                                    <span className="span dark right">{item.rate && item.qty ? item.qty * item.rate : '00.0'}</span>
                                </div>
                                {index != 0 ? <button className="link row__remove" aria-label="Remove Row" title="Remove Row" onClick={() => removeItem(index)}>
                                    <i className="fas fa-times" style={{ borderRadius: "50px 50px", background: "#eb3232", padding: "3px 5px", color: "#fff" }}></i>
                                </button> : null}
                            </div>
                        )
                    }
                    <div className="flex m-0-12">
                        <div className="view w-50 mt-10">
                            <button className="link addItem" onClick={() => addNewItem()}>
                                <i
                                    className="fas fa-plus fa-sm mr-10"
                                    style={{ borderRadius: "50px 50px", background: "#1c5d27", padding: "3px", color: "#fff" }}>
                                </i>
                                Add Line Item
                            </button>
                        </div>
                        <div className="view w-50 mt-10">
                            <div className="view flex">
                                <div className="view w-50 p-5">
                                    <input type="text" className="input " placeholder="" defaultValue="Sub Total" />

                                </div>
                                <div className="view w-50 p-5"><span className="span right bold dark">200.00</span>
                                </div>
                            </div>
                            <div className="view flex">
                                <div className="view w-50 p-5">
                                    <input type="text" className="input " placeholder="" defaultValue="Sale Tax (10%)" />
                                </div>
                                <div className="view w-50 p-5">
                                    <span className="span right bold dark">20.00</span>
                                </div>
                            </div>
                            <div className="view flex bg-gray p-5">
                                <div className="view w-50 p-5">
                                    <input type="text" className="input bold" placeholder="" defaultValue="TOTAL" />
                                </div>
                                <div className="view w-50 p-5 flex">
                                    <input type="text" className="input dark bold right ml-30" placeholder="" defaultValue="$" />
                                    <span className="span right bold dark w-auto">220.00</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row flex bg-dark m-0-12">
                        <input type="text" className="input bold center white w-100" placeholder="Place the address" />
                    </div>
                </div>
                <div className='center' onClick={() => _printInvoice()}> Print </div>
            </div>
        </>
    );
}


