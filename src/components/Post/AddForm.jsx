import React, { useContext, useState } from "react";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
    FaRegKeyboard,
    FaCalendarAlt,
    FaClock,
    FaFile,
    FaEnvelope,
    FaHashtag,
    FaDotCircle,
    FaList,
    FaPalette,
} from "react-icons/fa";
// import { MyContext } from "../../MyContext/MyContext";
// import axios from "axios";

const AddForm = () => {
    //   const { API_BASE_URL, showToast } = useContext(MyContext);
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
    const { id } = useParams();
    console.log(id);
    const navigate = useNavigate();
    const [fields, setFields] = useState([]);
    const [formData, setFormData] = useState({
    });

    const inputTypes = [
        { name: "Text", icon: <FaRegKeyboard /> },
        { name: "Date", icon: <FaCalendarAlt /> },
        { name: "Time", icon: <FaClock /> },
        { name: "File", icon: <FaFile /> },
        { name: "Email", icon: <FaEnvelope /> },
        { name: "Number", icon: <FaHashtag /> },
        { name: "Radio", icon: <FaDotCircle /> },
        { name: "Select", icon: <FaList /> },

    ];

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const addField = (type) => {
        if (type === "Create Button") {
            setFields([
                ...fields,
                { type: "Button", id: Date.now(), label: "Click Me", color: "#ff6600" },
            ]);
        } else {
            setFields([
                ...fields,
                {
                    type,
                    label: "",
                    id: Date.now(),
                    options: [],
                    required: false,
                    placeholder: `Enter ${type.toLowerCase()}`,
                },
            ]);
        }
    };

    const handleLabelChange = (index, value) => {
        const newFields = [...fields];
        newFields[index].label = value;
        setFields(newFields);
    };

    // const handleColorChange = (index, value) => {
    //     const newFields = [...fields];
    //     newFields[index].color = value;
    //     setFields(newFields);
    // };

    const handleOptionChange = (index, optionValue) => {
        const newFields = [...fields];
        newFields[index].newOption = optionValue || "";
        setFields(newFields);
    };

    const addOption = (index) => {
        const newFields = [...fields];
        const optionValue = newFields[index].newOption.trim();
        if (optionValue) {
            newFields[index].options.push(optionValue);
            newFields[index].newOption = "";
        }
        setFields(newFields);
    };

    const toggleRequired = (index) => {
        const newFields = [...fields];
        newFields[index].required = !newFields[index].required;
        setFields(newFields);
    };

    const deleteField = (index) => {
        setFields(fields.filter((_, i) => i !== index));
    };

    const handleXClick = () => {
        navigate("/post");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payLoad = {
            sourceId: id,
            formName: formData.formName?.trim() || "Untitled Form",
            tagName: formData.tagName?.trim() || "untitled",
            btnName: formData.btnName?.trim() || "Submit",
            fields: fields.map((field) => {
                const formattedField = {
                    label: field.label,
                    type: field.type.toLowerCase(),
                    required: field.required || false,
                    options: [],
                };

                if (field.type === "Radio" || field.type === "Select") {
                    formattedField.options = field.options.map((option) => ({
                        label: option,
                        value: option.toLowerCase().replace(/\s+/g, "_"),
                    }));
                }

                return formattedField;
            }),
        };

        try {
            const response = await axios.post(`${API_BASE_URL}/admin/form`, payLoad, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `${localStorage.getItem("token")}`,  // ✅ FIXED: no "Bearer "
                },
            });

            if (response.status === 201 || response.status === 200) {
                // alert("Form submitted successfully!");
                toast.success("Form submitted successfully!");
                setTimeout(() => {
                    navigate("/post");
                }, 3000);
                // navigate("/post");
            } else {
                toast.error("Failed to submit form. Please try again.");
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            toast.error("Error submitting form.");
        }
    };

    return (
        <div className="mt-2 flex justify-center items-center bg-white rounded-lg">
            <ToastContainer />
            <div className="w-full">
                <div className="flex justify-between">
                    <h2 className="text-xl font-bold mb-4 mt-8 ml-4">Create Your Form</h2>
                    <div
                        onClick={handleXClick}
                        className="bg-blue-500 mb-4 mt-8 mr-4 w-10 h-10 rounded cursor-pointer flex justify-center items-center text-white text-xl font-bold"
                    >
                        X
                    </div>
                </div>

                <form onSubmit={handleSubmit}>

                    <div className="flex flex-col lg:flex-row justify-between gap-6 mt-5">
                        {/* Left Side - Input Fields */}
                        <div className="w-full lg:w-2/3 p-4 max-h-[400px] overflow-y-auto scrollbar-thin">

                            {fields.map((field, index) => (
                                <div
                                    key={field.id}
                                    className="flex flex-col gap-3 border p-4 mt-2 rounded-lg shadow"
                                >
                                    {/* Label Input */}
                                    <input
                                        type="text"
                                        placeholder="Enter label"
                                        className="p-2 border outline-none focus:border-blue-400 rounded w-full"
                                        value={field.label || ""}
                                        onChange={(e) => handleLabelChange(index, e.target.value)}
                                    />

                                    {/* Dynamic Input Rendering */}
                                    {field.type === "Select" ? (
                                        <div className="w-full">
                                            <select className="p-2 border rounded w-full">
                                                <option>Select Option</option>
                                                {field.options.map((option, i) => (
                                                    <option key={i}>{option}</option>
                                                ))}
                                            </select>
                                            <div className="flex gap-2 mt-2">
                                                <input
                                                    type="text"
                                                    placeholder="Add option"
                                                    className="p-2 border rounded w-full"
                                                    value={field.newOption || ""}
                                                    onChange={(e) =>
                                                        handleOptionChange(index, e.target.value)
                                                    }
                                                />
                                                <button
                                                    type="button"
                                                    className="px-3 py-2 bg-blue-400 text-white rounded hover:bg-blue-600"
                                                    onClick={() => addOption(index)}
                                                >
                                                    Add
                                                </button>
                                            </div>
                                        </div>
                                    ) : field.type === "Radio" ? (
                                        <div className="w-full">
                                            {field.options.map((option, i) => (
                                                <div key={i} className="flex items-center gap-2">
                                                    <input
                                                        type="radio"
                                                        name={`radio-${field.id}`}
                                                        id={`radio-${field.id}-${i}`}
                                                    />
                                                    <label htmlFor={`radio-${field.id}-${i}`}>
                                                        {option}
                                                    </label>
                                                </div>
                                            ))}
                                            <div className="flex gap-2 mt-2">
                                                <input
                                                    type="text"
                                                    placeholder="Add radio option"
                                                    className="p-2 border rounded w-full"
                                                    value={field.newOption || ""}
                                                    onChange={(e) =>
                                                        handleOptionChange(index, e.target.value)
                                                    }
                                                />
                                                <button
                                                    type="button"
                                                    className="px-3 py-2 bg-blue-400 text-white rounded hover:bg-blue-400"
                                                    onClick={() => addOption(index)}
                                                >
                                                    Add
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        // 
                                        <></>
                                    )}

                                    {/* {/* Render Button with Editable Properties */}
                                    {field.type === "Button" && (
                                        <div className="flex flex-col items-start gap-2">
                                            <button
                                                style={{ backgroundColor: field.color }}
                                                className="text-white font-semibold px-4 py-2 rounded"
                                            >
                                                {field.label}
                                            </button>
                                            <input
                                                type="text"
                                                placeholder="Button Name"
                                                className="p-2 border rounded w-full"
                                                value={field.label || ""}
                                                onChange={(e) =>
                                                    handleLabelChange(index, e.target.value)
                                                }
                                            />
                                            {/* <input
                                            type="color"
                                            className="w-16 h-10 border rounded cursor-pointer"
                                            value={field.color}
                                            onChange={(e) => handleColorChange(index, e.target.value)}
                                        /> */}
                                        </div>
                                    )}

                                    {/* Required Checkbox & Delete Button */}
                                    <div className="flex justify-between">
                                        <div className="flex items-center gap-3">
                                            <input
                                                type="checkbox"
                                                checked={field.required}
                                                onChange={() => toggleRequired(index)}
                                                className="cursor-pointer accent-blue-400 text-white"
                                            />
                                            <label className="text-sm font-medium ">Required</label>
                                        </div>
                                        <button
                                            type="button"
                                            className="text-blue-500"
                                            onClick={() => deleteField(index)}
                                        >
                                            <MdDelete size={24} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Right Side - Add Input Fields */}
                        <div className="w-full lg:w-1/3 p-4 ">
                            <h2 className="text-lg font-semibold mb-4 text-center px-3 py-2 bg-yellow-500 text-white rounded w-full hover:bg-blue-600">
                                Add Input Fields
                            </h2>
                            <div className="grid grid-cols-2 sm:grid-cols-2 gap-3">
                                {inputTypes.map((type) =>
                                    type.name === "Create Button" ? (
                                        <div
                                            key={type.name}
                                            className="col-span-2 flex justify-center"
                                        >
                                            <button
                                                type="button"
                                                className="flex items-center gap-2 px-3 py-2 bg-blue-400 text-white rounded text-md font-semibold hover:bg-blue-600"
                                                onClick={() => addField(type.name)}
                                            >
                                                {type.icon} {type.name}
                                            </button>
                                        </div>
                                    ) : (
                                        <button
                                            key={type.name}
                                            type="button"
                                            className="flex items-center gap-2 px-3 py-2 bg-blue-400 text-white rounded text-md font-semibold hover:bg-blue-600"
                                            onClick={() => addField(type.name)}
                                        >
                                            {type.icon} {type.name}
                                        </button>
                                    )
                                )}
                            </div>

                            <div className="mt-4 flex justify-center w-full">
                                <button
                                    type="submit"
                                    className="px-3 py-2 bg-blue-400 text-white text-lg font-semibold rounded w-full hover:bg-blue-600"
                                >
                                    Create Form
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddForm;
