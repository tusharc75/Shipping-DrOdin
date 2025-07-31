
// import React, { useEffect, useState } from "react";

// function BoxDialog({ open, onClose, onAdd, boxToDuplicate }) {
//   const [length, setLength] = useState(boxToDuplicate ? boxToDuplicate.length : "");
//   const [breadth, setBreadth] = useState(boxToDuplicate ? boxToDuplicate.breadth : "");
//   const [height, setHeight] = useState(boxToDuplicate ? boxToDuplicate.height : "");
//   const [deadWeight, setDeadWeight] = useState(boxToDuplicate ? boxToDuplicate.deadWeight : "");
//   const [quantity, setQuantity] = useState(boxToDuplicate ? boxToDuplicate.quantity + 1 : 1);

//   useEffect(() => {
//     if (boxToDuplicate) {
//       setLength(boxToDuplicate.length);
//       setBreadth(boxToDuplicate.breadth);
//       setHeight(boxToDuplicate.height);
//       setDeadWeight(boxToDuplicate.deadWeight);
//       setQuantity(boxToDuplicate.quantity + 1);
//     } else {
//       setLength("");
//       setBreadth("");
//       setHeight("");
//       setDeadWeight("");
//       setQuantity(1);
//     }
//   }, [boxToDuplicate, open]);

//   if (!open) return null;

//   return (
//     <div style={{
//       position: "fixed",
//       top: 0, left: 0, width: "100vw", height: "100vh",
//       background: "rgba(0,0,0,0.25)",
//       display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000
//     }}>
//       <div style={{
//         background: "#fff",
//         borderRadius: "12px",
//         boxShadow: "0 2px 16px rgba(0,0,0,0.13)",
//         padding: "2rem 2rem 1.5rem 2rem",
//         minWidth: 320,
//         maxWidth: 360,
//         display: "flex",
//         flexDirection: "column",
//         gap: "1rem"
//       }}>
//         <h3 style={{ margin: 0, fontWeight: 700, fontSize: "1.15rem" }}>
//           {boxToDuplicate ? "Duplicate Box" : "Add New Box"}
//         </h3>
//         <div>
//           <label>Length (cm)</label>
//           <input type="number" value={length} onChange={e => setLength(+e.target.value)} style={{ width: "100%" }} />
//         </div>
//         <div>
//           <label>Breadth (cm)</label>
//           <input type="number" value={breadth} onChange={e => setBreadth(+e.target.value)} style={{ width: "100%" }} />
//         </div>
//         <div>
//           <label>Height (cm)</label>
//           <input type="number" value={height} onChange={e => setHeight(+e.target.value)} style={{ width: "100%" }} />
//         </div>
//         <div>
//           <label>Dead Weight (kg)</label>
//           <input type="number" value={deadWeight} onChange={e => setDeadWeight(+e.target.value)} style={{ width: "100%" }} />
//         </div>
//         <div>
//           <label>Quantity</label>
//           <input type="number" min={1} value={quantity} onChange={e => setQuantity(+e.target.value)} style={{ width: "100%" }} />
//         </div>
//         <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
//           <button
//             style={{
//               padding: "0.5rem 1.2rem",
//               background: "#007bff",
//               color: "#fff",
//               border: "none",
//               borderRadius: "6px",
//               fontWeight: 600,
//               cursor: "pointer"
//             }}
//             onClick={() => {
//               if (length && breadth && height && deadWeight && quantity > 0) {
//                 onAdd({ length, breadth, height, deadWeight, quantity });
//               }
//             }}
//           >
//             {boxToDuplicate ? "Duplicate" : "Add"}
//           </button>
//           <button
//             style={{
//               padding: "0.5rem 1.2rem",
//               background: "#eee",
//               color: "#222",
//               border: "none",
//               borderRadius: "6px",
//               fontWeight: 500,
//               cursor: "pointer"
//             }}
//             onClick={onClose}
//           >
//             Cancel
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default function Dashboard() {
//   const [providers, setProviders] = useState([]);
//   const [states, setStates] = useState([]);
//   const [fixedCharges, setFixedCharges] = useState([]);
//   const [selectedState, setSelectedState] = useState("");
//   const [results, setResults] = useState([]);
//   const [expandedIdx, setExpandedIdx] = useState(null);
//   const [showResults, setShowResults] = useState(false);
//   const [selectedProviderIdx, setSelectedProviderIdx] = useState(null);
//   const [vendorName, setVendorName] = useState("");
//   const [savedSelections, setSavedSelections] = useState([]);
//   const [boxes, setBoxes] = useState([]);
//   const [boxDialogOpen, setBoxDialogOpen] = useState(false);
//   const [boxToDuplicate, setBoxToDuplicate] = useState(null);
//   const [exportDialogOpen, setExportDialogOpen] = useState(false);
//   const [exportStartDate, setExportStartDate] = useState("");
//   const [exportEndDate, setExportEndDate] = useState("");
//   const [loading, setLoading] = useState(false);

//   // Add missing state for checkboxes
//   const [cod, setCOD] = useState(false);
//   const [holiday, setHoliday] = useState(false);
//   const [outstation, setOutstation] = useState(false);

//   // API base URL - adjust this based on your environment
//   const API_BASE_URL = process.env.NODE_ENV === 'production' 
//     ? 'https://shipping-drodin.onrender.com' 
//     : 'http://localhost:5000';

//   useEffect(() => {
//     // Load JSON data (assuming these are static files in public folder)
//     Promise.all([
//       fetch("/Providers.json").then(res => res.json()),
//       fetch("/Statewise_Charges.json").then(res => res.json()),
//       fetch("/Fixed_Charges.json").then(res => res.json())
//     ]).then(([providersData, statesData, fixedChargesData]) => {
//       setProviders(providersData);
//       setStates(statesData);
//       setFixedCharges(fixedChargesData);
//     }).catch(error => {
//       console.error('Error loading data:', error);
//       alert('Error loading configuration data');
//     });

//     // Load saved selections from backend
//     loadSavedSelections();
//   }, []);

//   const loadSavedSelections = async () => {
//     try {
//       const response = await fetch(`${API_BASE_URL}/api/selections`);
//       const result = await response.json();
//       if (result.success) {
//         setSavedSelections(result.data);
//       }
//     } catch (error) {
//       console.error('Error loading saved selections:', error);
//       // Don't show alert for this as it's not critical
//     }
//   };

//   const openAddBoxDialog = () => {
//     setBoxToDuplicate(null);
//     setBoxDialogOpen(true);
//   };

//   const openDuplicateBoxDialog = idx => {
//     setBoxToDuplicate(boxes[idx]);
//     setBoxDialogOpen(true);
//   };

//   const handleAddBox = box => {
//     if (boxToDuplicate) {
//       // Duplicate: update quantity for the box
//       setBoxes(prev =>
//         prev.map(b =>
//           b === boxToDuplicate
//             ? { ...b, quantity: box.quantity }
//             : b
//         )
//       );
//     } else {
//       setBoxes(prev => [...prev, box]);
//     }
//     setBoxDialogOpen(false);
//     setBoxToDuplicate(null);
//   };

//   const handleRemoveBox = idx => {
//     setBoxes(prev => prev.filter((_, i) => i !== idx));
//   };

//   const calculate = () => {
//     if (!selectedState || boxes.length === 0) {
//       alert('Please select a state and add at least one box');
//       return;
//     }

//     // Sum all boxes for total applicable weight
//     const stateFiltered = states.filter(s => s.State.toLowerCase() === selectedState.toLowerCase());

//     const providerResults = stateFiltered.map(stateRow => {
//       const vendorId = stateRow["Provider ID"];
//       const provider = providers.find(p => p["Provider ID"] === vendorId);
//       const fixed = fixedCharges.find(f => f["Provider ID"] === vendorId);

//       let totalApplicableWeight = 0;
//       boxes.forEach(box => {
//         const volWeight = (box.length * box.breadth * box.height) / 5000;
//         const applicableWeight = Math.max(volWeight, box.deadWeight);
//         totalApplicableWeight += applicableWeight * box.quantity;
//       });

//       const perKilo = stateRow["Per Kilo Fee (INR)"];
//       const fuelPct = stateRow["Fuel Surcharge (%)"];
//       const baseCost = perKilo * totalApplicableWeight;
//       const fuelCharge = (baseCost * fuelPct) / 100;

//       const totalBoxes = boxes.reduce((sum, box) => sum + box.quantity, 0);
//       const docket = (fixed?.["Docket Charge (INR)"] || 0) * totalBoxes;
//       const codCharge = cod ? ((fixed?.["COD Charge (INR)"] || 0) * totalBoxes) : 0;
//       const holidayCharge = holiday ? ((fixed?.["Holiday Charge (INR)"] || 0) * totalBoxes) : 0;
//       const outstationCharge = outstation ? ((fixed?.["Outstation Charge (INR)"] || 0) * totalBoxes) : 0;

//       const total = baseCost + fuelCharge + docket + codCharge + holidayCharge + outstationCharge;

//       return {
//         providerName: provider?.["Provider Name"] || "Unknown",
//         applicableWeight: totalApplicableWeight.toFixed(2),
//         baseCost: baseCost.toFixed(2),
//         fuelCharge: fuelCharge.toFixed(2),
//         docket: docket.toFixed(2),
//         codCharge: codCharge.toFixed(2),
//         holidayCharge: holidayCharge.toFixed(2),
//         outstationCharge: outstationCharge.toFixed(2),
//         total: total.toFixed(2),
//       };
//     });

//     providerResults.sort((a, b) => parseFloat(a.total) - parseFloat(b.total));
//     setResults(providerResults);
//     setExpandedIdx(null);
//     setShowResults(true);
//     setSelectedProviderIdx(null);
//     setVendorName("");
//   };

//   const handleProviderSelect = idx => {
//     setSelectedProviderIdx(idx);
//     setVendorName("");
//   };

//   const handleSaveSelection = async () => {
//     if (!vendorName.trim()) {
//       alert('Please enter a vendor name');
//       return;
//     }

//     const provider = results[selectedProviderIdx];
//     if (!provider) {
//       alert('Please select a provider first');
//       return;
//     }

//     setLoading(true);
//     const selection = {
//       vendorName: vendorName.trim(),
//       providerName: provider.providerName,
//       total: parseFloat(provider.total),
//       date: new Date().toISOString().slice(0, 10)
//     };

//     try {
//       console.log('Sending selection:', selection);
//       const response = await fetch(`${API_BASE_URL}/api/selections/add`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(selection)
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       const result = await response.json();
//       console.log('Save response:', result);
      
//       if (result.success) {
//         alert('Selection saved successfully!');
//         setSavedSelections(prev => [result.data, ...prev]);
//         setSelectedProviderIdx(null);
//         setVendorName("");
//       } else {
//         throw new Error(result.error || 'Failed to save');
//       }
//     } catch (error) {
//       console.error('Save error:', error);
//       let errorMessage = 'Failed to save selection. ';
      
//       if (error.message.includes('Failed to fetch')) {
//         errorMessage += 'Please check if the backend server is running on port 5000.';
//       } else {
//         errorMessage += error.message;
//       }
      
//       alert(errorMessage);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleExport = () => {
//     setExportDialogOpen(true);
//     // Set default dates to min/max in savedSelections if available
//     if (savedSelections.length > 0) {
//       const dates = savedSelections.map(s => s.date).sort();
//       setExportStartDate(dates[0]);
//       setExportEndDate(dates[dates.length - 1]);
//     }
//   };

//   const handleExportConfirm = () => {
//     let filtered = savedSelections;
//     if (exportStartDate && exportEndDate) {
//       filtered = savedSelections.filter(s =>
//         s.date >= exportStartDate && s.date <= exportEndDate
//       );
//     }
//     const csv = [
//       "Vendor Name,Provider Name,Total,Date",
//       ...filtered.map(s =>
//         `"${s.vendorName}","${s.providerName}",${s.total},"${s.date}"`
//       )
//     ].join("\n");
//     const blob = new Blob([csv], { type: "text/csv" });
//     const url = URL.createObjectURL(blob);
//     const a = document.createElement("a");
//     a.href = url;
//     a.download = "provider_selections.csv";
//     a.click();
//     URL.revokeObjectURL(url);
//     setExportDialogOpen(false);
//   };

//   return (
//     <div
//       className="dashboard-flex-container"
//       style={{
//         display: "flex",
//         gap: "2.5rem",
//         alignItems: "flex-start",
//         minHeight: "100vh",
//         position: "relative",
//         overflow: "hidden"
//       }}
//     >
//       {/* Animated gradient background */}
//       <div
//         style={{
//           position: "fixed",
//           top: 0,
//           left: 0,
//           width: "100vw",
//           height: "100vh",
//           zIndex: 0,
//           background: "linear-gradient(120deg, #a1c4fd, #c2e9fb 40%, #fbc2eb 70%, #fad0c4 100%)",
//           animation: "gradientMove 12s ease-in-out infinite",
//           backgroundSize: "200% 200%",
//           transition: "background 0.5s"
//         }}
//       />
//       {/* Add keyframes for animation */}
//       <style>
//         {`
//           @keyframes gradientMove {
//             0% { background-position: 0% 50%; }
//             50% { background-position: 100% 50%; }
//             100% { background-position: 0% 50%; }
//           }
//         `}
//       </style>
//       {/* Left margin for spacing */}
//       <div style={{ width: "4vw", minWidth: "32px", zIndex: 1 }}></div>
//       {/* Left: Input Form */}
//       <div
//         className="dashboard-card"
//         style={{
//           flex: "0 0 340px",
//           minWidth: "280px",
//           background: "#fff",
//           borderRadius: "14px",
//           boxShadow: "0 2px 16px rgba(0,0,0,0.07)",
//           padding: "2rem 1.5rem",
//           marginTop: "2rem",
//           marginBottom: "2rem",
//           display: "flex",
//           flexDirection: "column",
//           gap: "1.2rem",
//           zIndex: 2
//         }}
//       >
//         <h1
//           className="dashboard-title"
//           style={{
//             fontSize: "1.35rem",
//             fontWeight: 700,
//             marginBottom: "0.5rem",
//             color: "#2d3748",
//             letterSpacing: "0.5px"
//           }}
//         >
//           Shipping Fee Calculator
//         </h1>
//         <div style={{ marginBottom: "1.2rem" }}>
//           <label style={{ fontWeight: 500, marginBottom: 2 }}>State</label>
//           <select
//             value={selectedState}
//             onChange={(e) => setSelectedState(e.target.value)}
//             className="dashboard-select"
//             style={{
//               width: "100%",
//               padding: "0.4rem",
//               borderRadius: "6px",
//               border: "1px solid #e2e8f0"
//             }}
//           >
//             <option value="">Select State</option>
//             {[...new Set(states.map(s => s.State))].map((s, i) => (
//               <option key={i} value={s}>{s}</option>
//             ))}
//           </select>
//         </div>
//         {/* Box List */}
//         <div style={{ marginBottom: "1.2rem" }}>
//           <div style={{ fontWeight: 600, marginBottom: "0.5rem" }}>Boxes</div>
//           {boxes.length === 0 && (
//             <div style={{ color: "#888", marginBottom: "0.5rem" }}>No boxes added yet.</div>
//           )}
//           {boxes.map((box, idx) => (
//             <div key={idx} style={{
//               background: "#f8f9fa",
//               borderRadius: "6px",
//               padding: "0.7rem 1rem",
//               marginBottom: "0.5rem",
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "space-between"
//             }}>
//               <div>
//                 <span style={{ fontWeight: 500 }}>Box {idx + 1}:</span>
//                 <span style={{ marginLeft: "0.5rem" }}>
//                   {box.length}x{box.breadth}x{box.height} cm, {box.deadWeight} kg, Qty: {box.quantity}
//                 </span>
//               </div>
//               <div style={{ display: "flex", gap: "0.5rem" }}>
//                 <button
//                   style={{
//                     padding: "0.2rem 0.7rem",
//                     background: "#007bff",
//                     color: "#fff",
//                     border: "none",
//                     borderRadius: "4px",
//                     fontWeight: 500,
//                     cursor: "pointer"
//                   }}
//                   onClick={() => openDuplicateBoxDialog(idx)}
//                   title="Duplicate Box"
//                 >
//                   Duplicate
//                 </button>
//                 <button
//                   style={{
//                     padding: "0.2rem 0.7rem",
//                     background: "#f3722c",
//                     color: "#fff",
//                     border: "none",
//                     borderRadius: "4px",
//                     fontWeight: 500,
//                     cursor: "pointer"
//                   }}
//                   onClick={() => handleRemoveBox(idx)}
//                   title="Remove Box"
//                 >
//                   Remove
//                 </button>
//               </div>
//             </div>
//           ))}
//           <button
//             style={{
//               marginTop: "0.5rem",
//               padding: "0.4rem 1rem",
//               background: "#45eb69",
//               color: "#22223b",
//               border: "none",
//               borderRadius: "6px",
//               fontWeight: 600,
//               cursor: "pointer"
//             }}
//             onClick={openAddBoxDialog}
//           >
//             Add New Box
//           </button>
//         </div>
//         {/* Checkboxes */}
//         <div className="dashboard-checkboxes" style={{ display: "flex", gap: "1rem", marginTop: "0.5rem" }}>
//           <label className="dashboard-checkbox" style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
//             <input type="checkbox" checked={cod} onChange={(e) => setCOD(e.target.checked)} />
//             <span style={{ fontSize: "0.98em" }}>COD</span>
//           </label>
//           <label className="dashboard-checkbox" style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
//             <input type="checkbox" checked={holiday} onChange={(e) => setHoliday(e.target.checked)} />
//             <span style={{ fontSize: "0.98em" }}>Holiday</span>
//           </label>
//           <label className="dashboard-checkbox" style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
//             <input type="checkbox" checked={outstation} onChange={(e) => setOutstation(e.target.checked)} />
//             <span style={{ fontSize: "0.98em" }}>Outstation</span>
//           </label>
//         </div>
//         <button
//           className="dashboard-btn"
//           onClick={calculate}
//           disabled={!selectedState || boxes.length === 0}
//           style={{
//             marginTop: "1.2rem",
//             padding: "0.6rem 1.2rem",
//             background: (!selectedState || boxes.length === 0) ? "#ccc" : "#007bff",
//             color: "#fff",
//             border: "none",
//             borderRadius: "6px",
//             fontWeight: 600,
//             fontSize: "1rem",
//             cursor: (!selectedState || boxes.length === 0) ? "not-allowed" : "pointer",
//             boxShadow: "0 1px 4px rgba(0,0,0,0.07)"
//           }}
//         >
//           Calculate
//         </button>
//       </div>
//       {/* Box Dialog */}
//       <BoxDialog
//         open={boxDialogOpen}
//         onClose={() => setBoxDialogOpen(false)}
//         onAdd={handleAddBox}
//         boxToDuplicate={boxToDuplicate}
//       />
//       {/* Right: Dashboard Results with 3D effect and right margin */}
//       <div
//         className="dashboard-result"
//         style={{
//           flex: 1,
//           minWidth: "320px",
//           background: "#fff",
//           borderRadius: "14px",
//           padding: "2rem 1.5rem",
//           marginTop: "2rem",
//           marginBottom: "2rem",
//           marginRight: "3vw",
//           zIndex: 2,
//           // 3D effect: scale and shadow transition
//           transform: showResults ? "scale(1)" : "scale(0.97)",
//           boxShadow: showResults
//             ? "0 8px 32px 0 rgba(31, 38, 135, 0.18), 0 2px 16px rgba(0,0,0,0.07)"
//             : "0 2px 16px rgba(0,0,0,0.07)",
//           opacity: showResults ? 1 : 0.85,
//           transition:
//             "transform 0.5s cubic-bezier(.68,-0.55,.27,1.55), box-shadow 0.5s cubic-bezier(.68,-0.55,.27,1.55), opacity 0.5s",
//           position: "relative" // for absolute positioning of export icon
//         }}
//       >
//         {/* Export icon button at top right */}
//         <button
//           onClick={handleExport}
//           disabled={savedSelections.length === 0}
//           title="Export Monthly Provider Data"
//           style={{
//             position: "absolute",
//             top: "1.5rem",
//             right: "1.5rem",
//             background: "none",
//             border: "none",
//             cursor: savedSelections.length === 0 ? "not-allowed" : "pointer",
//             padding: 0,
//             margin: 0,
//             opacity: savedSelections.length === 0 ? 0.5 : 1,
//             zIndex: 10
//           }}
//         >
//           {/* Simple download SVG icon */}
//           <svg width="26" height="26" viewBox="0 0 20 20" fill="none">
//             <circle cx="10" cy="10" r="10" fill="#45eb69"/>
//             <path d="M10 5v7m0 0l-3-3m3 3l3-3M5 15h10" stroke="#22223b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
//           </svg>
//         </button>
//         {/* Export dialog popup */}
//         {exportDialogOpen && (
//           <div style={{
//             position: "fixed",
//             top: 0, left: 0, width: "100vw", height: "100vh",
//             background: "rgba(0,0,0,0.25)",
//             display: "flex", alignItems: "center", justifyContent: "center",
//             zIndex: 2000
//           }}>
//             <div style={{
//               background: "#fff",
//               borderRadius: "12px",
//               boxShadow: "0 2px 16px rgba(0,0,0,0.13)",
//               padding: "2rem 2rem 1.5rem 2rem",
//               minWidth: 320,
//               maxWidth: 360,
//               display: "flex",
//               flexDirection: "column",
//               gap: "1rem"
//             }}>
//               <h3 style={{ margin: 0, fontWeight: 700, fontSize: "1.1rem" }}>
//                 Export Provider Data
//               </h3>
//               <div>
//                 <label>Start Date</label>
//                 <input
//                   type="date"
//                   value={exportStartDate}
//                   min={savedSelections.length > 0 ? savedSelections.map(s => s.date).sort()[0] : ""}
//                   max={exportEndDate || ""}
//                   onChange={e => setExportStartDate(e.target.value)}
//                   style={{ width: "100%" }}
//                 />
//               </div>
//               <div>
//                 <label>End Date</label>
//                 <input
//                   type="date"
//                   value={exportEndDate}
//                   min={exportStartDate || ""}
//                   max={savedSelections.length > 0 ? savedSelections.map(s => s.date).sort().slice(-1)[0] : ""}
//                   onChange={e => setExportEndDate(e.target.value)}
//                   style={{ width: "100%" }}
//                 />
//               </div>
//               <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
//                 <button
//                   style={{
//                     padding: "0.5rem 1.2rem",
//                     background: "#45eb69",
//                     color: "#22223b",
//                     border: "none",
//                     borderRadius: "6px",
//                     fontWeight: 600,
//                     cursor: "pointer"
//                   }}
//                   onClick={handleExportConfirm}
//                   disabled={!exportStartDate || !exportEndDate}
//                 >
//                   Download CSV
//                 </button>
//                 <button
//                   style={{
//                     padding: "0.5rem 1.2rem",
//                     background: "#eee",
//                     color: "#222",
//                     border: "none",
//                     borderRadius: "6px",
//                     fontWeight: 500,
//                     cursor: "pointer"
//                   }}
//                   onClick={() => setExportDialogOpen(false)}
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//         <h2
//           className="dashboard-result-title"
//           style={{
//             fontSize: "1.15rem",
//             fontWeight: 700,
//             marginBottom: "1.2rem",
//             color: "#2d3748"
//           }}
//         >
//           Providers & Charges
//         </h2>
//         {/* Provider selection form moved to top */}
//         {selectedProviderIdx !== null && (
//           <div
//             style={{
//               margin: "0 0 1.5rem 0",
//               padding: "1rem",
//               background: "#f8f9fa",
//               borderRadius: "8px",
//               boxShadow: "0 1px 4px rgba(0,0,0,0.07)"
//             }}
//           >
//             <div style={{ marginBottom: "0.7rem", fontWeight: 600 }}>
//               Add Vendor Name for <span style={{ color: "#007bff" }}>{results[selectedProviderIdx].providerName}</span>
//             </div>
//             <input
//               type="text"
//               value={vendorName}
//               onChange={e => setVendorName(e.target.value)}
//               placeholder="Enter vendor name"
//               style={{
//                 width: "100%",
//                 padding: "0.5rem",
//                 borderRadius: "6px",
//                 border: "1px solid #e2e8f0",
//                 marginBottom: "0.7rem"
//               }}
//             />
//             <button
//               style={{
//                 padding: "0.5rem 1.2rem",
//                 background: loading ? "#ccc" : "#22223b",
//                 color: "#fff",
//                 border: "none",
//                 borderRadius: "6px",
//                 fontWeight: 600,
//                 cursor: loading ? "not-allowed" : "pointer"
//               }}
//               onClick={handleSaveSelection}
//               disabled={loading || !vendorName.trim()}
//             >
//               {loading ? "Saving..." : "Save Selection"}
//             </button>
//           </div>
//         )}
//         {results.length === 0 ? (
//           <div style={{ color: "#888" }}>No results yet. Please calculate to see providers and charges.</div>
//         ) : (
//           <>
//             <ul className="dashboard-result-list" style={{ listStyle: "none", padding: 0 }}>
//               {results.map((r, idx) => (
//                 <li
//                   key={idx}
//                   className="dashboard-result-card"
//                   style={{
//                     marginBottom: "1rem",
//                     border: "1px solid #e2e8f0",
//                     borderRadius: "8px",
//                     padding: "1rem",
//                     cursor: "pointer",
//                     background: expandedIdx === idx ? "#f7fafc" : "#fff",
//                     transition: "background 0.2s",
//                     boxShadow: selectedProviderIdx === idx ? "0 0 0 2px #007bff" : undefined
//                   }}
//                   onClick={() => setExpandedIdx(expandedIdx === idx ? null : idx)}
//                 >
//                   <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//                     <strong style={{ fontSize: "1.05em" }}>{r.providerName}</strong>
//                     <span style={{ fontWeight: 600, color: "#007bff", fontSize: "1.08em" }}>₹{r.total}</span>
//                   </div>
//                   {expandedIdx === idx && (
//                     <div style={{ marginTop: "0.75rem", fontSize: "0.97em", color: "#444" }}>
//                       <div>Applicable Weight: {r.applicableWeight} kg</div>
//                       <div>Base Cost: ₹{r.baseCost}</div>
//                       <div>Fuel Charge: ₹{r.fuelCharge}</div>
//                       <div>Docket: ₹{r.docket}</div>
//                       <div>COD: ₹{r.codCharge}</div>
//                       <div>Holiday: ₹{r.holidayCharge}</div>
//                       <div>Outstation: ₹{r.outstationCharge}</div>
//                       <button
//                         style={{
//                           marginTop: "1rem",
//                           padding: "0.4rem 1rem",
//                           background: "#007bff",
//                           color: "#fff",
//                           border: "none",
//                           borderRadius: "6px",
//                           fontWeight: 500,
//                           cursor: "pointer"
//                         }}
//                         onClick={(e) => {
//                           e.stopPropagation();
//                           handleProviderSelect(idx);
//                         }}
//                       >
//                         Select This Provider
//                       </button>
//                     </div>
//                   )}
//                 </li>
//               ))}
//             </ul>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }







import React, { useEffect, useState } from "react";

function BoxDialog({ open, onClose, onAdd, boxToDuplicate }) {
  const [length, setLength] = useState(boxToDuplicate ? boxToDuplicate.length : "");
  const [breadth, setBreadth] = useState(boxToDuplicate ? boxToDuplicate.breadth : "");
  const [height, setHeight] = useState(boxToDuplicate ? boxToDuplicate.height : "");
  const [deadWeight, setDeadWeight] = useState(boxToDuplicate ? boxToDuplicate.deadWeight : "");
  const [quantity, setQuantity] = useState(boxToDuplicate ? boxToDuplicate.quantity + 1 : 1);

  useEffect(() => {
    if (boxToDuplicate) {
      setLength(boxToDuplicate.length);
      setBreadth(boxToDuplicate.breadth);
      setHeight(boxToDuplicate.height);
      setDeadWeight(boxToDuplicate.deadWeight);
      setQuantity(boxToDuplicate.quantity + 1);
    } else {
      setLength("");
      setBreadth("");
      setHeight("");
      setDeadWeight("");
      setQuantity(1);
    }
  }, [boxToDuplicate, open]);

  if (!open) return null;

  return (
    <div style={{
      position: "fixed",
      top: 0, left: 0, width: "100vw", height: "100vh",
      background: "rgba(0,0,0,0.25)",
      display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000
    }}>
      <div style={{
        background: "#fff",
        borderRadius: "12px",
        boxShadow: "0 2px 16px rgba(0,0,0,0.13)",
        padding: "2rem 2rem 1.5rem 2rem",
        minWidth: 320,
        maxWidth: 360,
        display: "flex",
        flexDirection: "column",
        gap: "1rem"
      }}>
        <h3 style={{ margin: 0, fontWeight: 700, fontSize: "1.15rem" }}>
          {boxToDuplicate ? "Duplicate Box" : "Add New Box"}
        </h3>
        <div>
          <label>Length (cm)</label>
          <input type="number" value={length} onChange={e => setLength(+e.target.value)} style={{ width: "100%" }} />
        </div>
        <div>
          <label>Breadth (cm)</label>
          <input type="number" value={breadth} onChange={e => setBreadth(+e.target.value)} style={{ width: "100%" }} />
        </div>
        <div>
          <label>Height (cm)</label>
          <input type="number" value={height} onChange={e => setHeight(+e.target.value)} style={{ width: "100%" }} />
        </div>
        <div>
          <label>Dead Weight (kg)</label>
          <input type="number" value={deadWeight} onChange={e => setDeadWeight(+e.target.value)} style={{ width: "100%" }} />
        </div>
        <div>
          <label>Quantity</label>
          <input type="number" min={1} value={quantity} onChange={e => setQuantity(+e.target.value)} style={{ width: "100%" }} />
        </div>
        <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
          <button
            style={{
              padding: "0.5rem 1.2rem",
              background: "#007bff",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              fontWeight: 600,
              cursor: "pointer"
            }}
            onClick={() => {
              if (length && breadth && height && deadWeight && quantity > 0) {
                onAdd({ length, breadth, height, deadWeight, quantity });
              }
            }}
          >
            {boxToDuplicate ? "Duplicate" : "Add"}
          </button>
          <button
            style={{
              padding: "0.5rem 1.2rem",
              background: "#eee",
              color: "#222",
              border: "none",
              borderRadius: "6px",
              fontWeight: 500,
              cursor: "pointer"
            }}
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const [providers, setProviders] = useState([]);
  const [states, setStates] = useState([]);
  const [fixedCharges, setFixedCharges] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [results, setResults] = useState([]);
  const [expandedIdx, setExpandedIdx] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [selectedProviderIdx, setSelectedProviderIdx] = useState(null);
  const [vendorName, setVendorName] = useState("");
  const [savedSelections, setSavedSelections] = useState([]);
  const [boxes, setBoxes] = useState([]);
  const [boxDialogOpen, setBoxDialogOpen] = useState(false);
  const [boxToDuplicate, setBoxToDuplicate] = useState(null);
  const [exportDialogOpen, setExportDialogOpen] = useState(false);
  const [exportStartDate, setExportStartDate] = useState("");
  const [exportEndDate, setExportEndDate] = useState("");
  const [selectedVendor, setSelectedVendor] = useState("");
  const [loading, setLoading] = useState(false);
  const [exportLoading, setExportLoading] = useState(false);

  // Add missing state for checkboxes
  const [cod, setCOD] = useState(false);
  const [holiday, setHoliday] = useState(false);
  const [outstation, setOutstation] = useState(false);

  // API base URL - adjust this based on your environment
  const API_BASE_URL = process.env.NODE_ENV === 'production' 
    ? 'https://shipping-drodin.onrender.com' 
    : 'http://localhost:5000';

  useEffect(() => {
    // Load JSON data (assuming these are static files in public folder)
    Promise.all([
      fetch("/Providers.json").then(res => res.json()),
      fetch("/Statewise_Charges.json").then(res => res.json()),
      fetch("/Fixed_Charges.json").then(res => res.json())
    ]).then(([providersData, statesData, fixedChargesData]) => {
      setProviders(providersData);
      setStates(statesData);
      setFixedCharges(fixedChargesData);
    }).catch(error => {
      console.error('Error loading data:', error);
      alert('Error loading configuration data');
    });

    // Load saved selections from backend
    loadSavedSelections();
  }, []);

  const loadSavedSelections = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/selections`);
      const result = await response.json();
      if (result.success) {
        setSavedSelections(result.data);
      }
    } catch (error) {
      console.error('Error loading saved selections:', error);
      // Don't show alert for this as it's not critical
    }
  };

  const openAddBoxDialog = () => {
    setBoxToDuplicate(null);
    setBoxDialogOpen(true);
  };

  const openDuplicateBoxDialog = idx => {
    setBoxToDuplicate(boxes[idx]);
    setBoxDialogOpen(true);
  };

  const handleAddBox = box => {
    if (boxToDuplicate) {
      // Duplicate: update quantity for the box
      setBoxes(prev =>
        prev.map(b =>
          b === boxToDuplicate
            ? { ...b, quantity: box.quantity }
            : b
        )
      );
    } else {
      setBoxes(prev => [...prev, box]);
    }
    setBoxDialogOpen(false);
    setBoxToDuplicate(null);
  };

  const handleRemoveBox = idx => {
    setBoxes(prev => prev.filter((_, i) => i !== idx));
  };

  const calculate = () => {
    if (!selectedState || boxes.length === 0) {
      alert('Please select a state and add at least one box');
      return;
    }

    // Sum all boxes for total applicable weight
    const stateFiltered = states.filter(s => s.State.toLowerCase() === selectedState.toLowerCase());

    const providerResults = stateFiltered.map(stateRow => {
      const vendorId = stateRow["Provider ID"];
      const provider = providers.find(p => p["Provider ID"] === vendorId);
      const fixed = fixedCharges.find(f => f["Provider ID"] === vendorId);

      let totalApplicableWeight = 0;
      boxes.forEach(box => {
        const volWeight = (box.length * box.breadth * box.height) / 5000;
        const applicableWeight = Math.max(volWeight, box.deadWeight);
        totalApplicableWeight += applicableWeight * box.quantity;
      });

      const perKilo = stateRow["Per Kilo Fee (INR)"];
      const fuelPct = stateRow["Fuel Surcharge (%)"];
      const baseCost = perKilo * totalApplicableWeight;
      const fuelCharge = (baseCost * fuelPct) / 100;

      const totalBoxes = boxes.reduce((sum, box) => sum + box.quantity, 0);
      const docket = (fixed?.["Docket Charge (INR)"] || 0) * totalBoxes;
      const codCharge = cod ? ((fixed?.["COD Charge (INR)"] || 0) * totalBoxes) : 0;
      const holidayCharge = holiday ? ((fixed?.["Holiday Charge (INR)"] || 0) * totalBoxes) : 0;
      const outstationCharge = outstation ? ((fixed?.["Outstation Charge (INR)"] || 0) * totalBoxes) : 0;

      const total = baseCost + fuelCharge + docket + codCharge + holidayCharge + outstationCharge;

      return {
        providerName: provider?.["Provider Name"] || "Unknown",
        applicableWeight: totalApplicableWeight.toFixed(2),
        baseCost: baseCost.toFixed(2),
        fuelCharge: fuelCharge.toFixed(2),
        docket: docket.toFixed(2),
        codCharge: codCharge.toFixed(2),
        holidayCharge: holidayCharge.toFixed(2),
        outstationCharge: outstationCharge.toFixed(2),
        total: total.toFixed(2),
      };
    });

    providerResults.sort((a, b) => parseFloat(a.total) - parseFloat(b.total));
    setResults(providerResults);
    setExpandedIdx(null);
    setShowResults(true);
    setSelectedProviderIdx(null);
    setVendorName("");
  };

  const handleProviderSelect = idx => {
    setSelectedProviderIdx(idx);
    setVendorName("");
  };

  const handleSaveSelection = async () => {
    if (!vendorName.trim()) {
      alert('Please enter a vendor name');
      return;
    }

    const provider = results[selectedProviderIdx];
    if (!provider) {
      alert('Please select a provider first');
      return;
    }

    setLoading(true);
    const selection = {
      vendorName: vendorName.trim(),
      providerName: provider.providerName,
      total: parseFloat(provider.total),
      date: new Date().toISOString().slice(0, 10)
    };

    try {
      console.log('Sending selection:', selection);
      const response = await fetch(`${API_BASE_URL}/api/selections/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(selection)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log('Save response:', result);
      
      if (result.success) {
        alert('Selection saved successfully!');
        setSavedSelections(prev => [result.data, ...prev]);
        setSelectedProviderIdx(null);
        setVendorName("");
      } else {
        throw new Error(result.error || 'Failed to save');
      }
    } catch (error) {
      console.error('Save error:', error);
      let errorMessage = 'Failed to save selection. ';
      
      if (error.message.includes('Failed to fetch')) {
        errorMessage += 'Please check if the backend server is running on port 5000.';
      } else {
        errorMessage += error.message;
      }
      
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleExport = () => {
    setExportDialogOpen(true);
    // Set default dates to min/max in savedSelections if available
    if (savedSelections.length > 0) {
      const dates = savedSelections.map(s => s.date).sort();
      setExportStartDate(dates[0]);
      setExportEndDate(dates[dates.length - 1]);
    }
    // Reset vendor selection
    setSelectedVendor("");
  };

  // Get unique vendor names for the dropdown
  const uniqueVendors = [...new Set(savedSelections.map(s => s.vendorName))].sort();

  const handleExportConfirm = async () => {
    if (!exportStartDate || !exportEndDate) {
      alert('Please select both start and end dates');
      return;
    }

    setExportLoading(true);
    
    try {
      // Build query parameters
      const params = new URLSearchParams({
        startDate: exportStartDate,
        endDate: exportEndDate
      });

      // Fetch data from the range endpoint
      const response = await fetch(`${API_BASE_URL}/api/selections/range?${params}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      
      if (!result.success) {
        throw new Error(result.error || 'Failed to fetch data');
      }

      let dataToExport = result.data;

      // Filter by vendor if selected
      if (selectedVendor) {
        dataToExport = dataToExport.filter(s => s.vendorName === selectedVendor);
      }

      if (dataToExport.length === 0) {
        alert('No data found for the selected criteria');
        setExportLoading(false);
        return;
      }

      // Create CSV with all details
      const csvHeaders = "Vendor Name,Provider Name,Total (INR),Date,Created At";
      const csvRows = dataToExport.map(s => {
        const createdAt = s.createdAt ? new Date(s.createdAt).toLocaleString() : 'N/A';
        return `"${s.vendorName}","${s.providerName}",${s.total},"${s.date}","${createdAt}"`;
      });

      const csv = [csvHeaders, ...csvRows].join("\n");
      
      // Create and download file
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      
      // Create filename with date range and vendor info
      const vendorSuffix = selectedVendor ? `_${selectedVendor.replace(/[^a-zA-Z0-9]/g, '_')}` : '';
      a.download = `provider_selections_${exportStartDate}_to_${exportEndDate}${vendorSuffix}.csv`;
      
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      setExportDialogOpen(false);
      alert(`Successfully exported ${dataToExport.length} records!`);
      
    } catch (error) {
      console.error('Export error:', error);
      alert(`Export failed: ${error.message}`);
    } finally {
      setExportLoading(false);
    }
  };

  return (
    <div
      className="dashboard-flex-container"
      style={{
        display: "flex",
        gap: "2.5rem",
        alignItems: "flex-start",
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden"
      }}
    >
      {/* Animated gradient background */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          zIndex: 0,
          background: "linear-gradient(120deg, #a1c4fd, #c2e9fb 40%, #fbc2eb 70%, #fad0c4 100%)",
          animation: "gradientMove 12s ease-in-out infinite",
          backgroundSize: "200% 200%",
          transition: "background 0.5s"
        }}
      />
      {/* Add keyframes for animation */}
      <style>
        {`
          @keyframes gradientMove {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
        `}
      </style>
      {/* Left margin for spacing */}
      <div style={{ width: "4vw", minWidth: "32px", zIndex: 1 }}></div>
      {/* Left: Input Form */}
      <div
        className="dashboard-card"
        style={{
          flex: "0 0 340px",
          minWidth: "280px",
          background: "#fff",
          borderRadius: "14px",
          boxShadow: "0 2px 16px rgba(0,0,0,0.07)",
          padding: "2rem 1.5rem",
          marginTop: "2rem",
          marginBottom: "2rem",
          display: "flex",
          flexDirection: "column",
          gap: "1.2rem",
          zIndex: 2
        }}
      >
        <h1
          className="dashboard-title"
          style={{
            fontSize: "1.35rem",
            fontWeight: 700,
            marginBottom: "0.5rem",
            color: "#2d3748",
            letterSpacing: "0.5px"
          }}
        >
          Shipping Fee Calculator
        </h1>
        <div style={{ marginBottom: "1.2rem" }}>
          <label style={{ fontWeight: 500, marginBottom: 2 }}>State</label>
          <select
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
            className="dashboard-select"
            style={{
              width: "100%",
              padding: "0.4rem",
              borderRadius: "6px",
              border: "1px solid #e2e8f0"
            }}
          >
            <option value="">Select State</option>
            {[...new Set(states.map(s => s.State))].map((s, i) => (
              <option key={i} value={s}>{s}</option>
            ))}
          </select>
        </div>
        {/* Box List */}
        <div style={{ marginBottom: "1.2rem" }}>
          <div style={{ fontWeight: 600, marginBottom: "0.5rem" }}>Boxes</div>
          {boxes.length === 0 && (
            <div style={{ color: "#888", marginBottom: "0.5rem" }}>No boxes added yet.</div>
          )}
          {boxes.map((box, idx) => (
            <div key={idx} style={{
              background: "#f8f9fa",
              borderRadius: "6px",
              padding: "0.7rem 1rem",
              marginBottom: "0.5rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between"
            }}>
              <div>
                <span style={{ fontWeight: 500 }}>Box {idx + 1}:</span>
                <span style={{ marginLeft: "0.5rem" }}>
                  {box.length}x{box.breadth}x{box.height} cm, {box.deadWeight} kg, Qty: {box.quantity}
                </span>
              </div>
              <div style={{ display: "flex", gap: "0.5rem" }}>
                <button
                  style={{
                    padding: "0.2rem 0.7rem",
                    background: "#007bff",
                    color: "#fff",
                    border: "none",
                    borderRadius: "4px",
                    fontWeight: 500,
                    cursor: "pointer"
                  }}
                  onClick={() => openDuplicateBoxDialog(idx)}
                  title="Duplicate Box"
                >
                  Duplicate
                </button>
                <button
                  style={{
                    padding: "0.2rem 0.7rem",
                    background: "#f3722c",
                    color: "#fff",
                    border: "none",
                    borderRadius: "4px",
                    fontWeight: 500,
                    cursor: "pointer"
                  }}
                  onClick={() => handleRemoveBox(idx)}
                  title="Remove Box"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          <button
            style={{
              marginTop: "0.5rem",
              padding: "0.4rem 1rem",
              background: "#45eb69",
              color: "#22223b",
              border: "none",
              borderRadius: "6px",
              fontWeight: 600,
              cursor: "pointer"
            }}
            onClick={openAddBoxDialog}
          >
            Add New Box
          </button>
        </div>
        {/* Checkboxes */}
        <div className="dashboard-checkboxes" style={{ display: "flex", gap: "1rem", marginTop: "0.5rem" }}>
          <label className="dashboard-checkbox" style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
            <input type="checkbox" checked={cod} onChange={(e) => setCOD(e.target.checked)} />
            <span style={{ fontSize: "0.98em" }}>COD</span>
          </label>
          <label className="dashboard-checkbox" style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
            <input type="checkbox" checked={holiday} onChange={(e) => setHoliday(e.target.checked)} />
            <span style={{ fontSize: "0.98em" }}>Holiday</span>
          </label>
          <label className="dashboard-checkbox" style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
            <input type="checkbox" checked={outstation} onChange={(e) => setOutstation(e.target.checked)} />
            <span style={{ fontSize: "0.98em" }}>Outstation</span>
          </label>
        </div>
        <button
          className="dashboard-btn"
          onClick={calculate}
          disabled={!selectedState || boxes.length === 0}
          style={{
            marginTop: "1.2rem",
            padding: "0.6rem 1.2rem",
            background: (!selectedState || boxes.length === 0) ? "#ccc" : "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            fontWeight: 600,
            fontSize: "1rem",
            cursor: (!selectedState || boxes.length === 0) ? "not-allowed" : "pointer",
            boxShadow: "0 1px 4px rgba(0,0,0,0.07)"
          }}
        >
          Calculate
        </button>
      </div>
      {/* Box Dialog */}
      <BoxDialog
        open={boxDialogOpen}
        onClose={() => setBoxDialogOpen(false)}
        onAdd={handleAddBox}
        boxToDuplicate={boxToDuplicate}
      />
      {/* Right: Dashboard Results with 3D effect and right margin */}
      <div
        className="dashboard-result"
        style={{
          flex: 1,
          minWidth: "320px",
          background: "#fff",
          borderRadius: "14px",
          padding: "2rem 1.5rem",
          marginTop: "2rem",
          marginBottom: "2rem",
          marginRight: "3vw",
          zIndex: 2,
          // 3D effect: scale and shadow transition
          transform: showResults ? "scale(1)" : "scale(0.97)",
          boxShadow: showResults
            ? "0 8px 32px 0 rgba(31, 38, 135, 0.18), 0 2px 16px rgba(0,0,0,0.07)"
            : "0 2px 16px rgba(0,0,0,0.07)",
          opacity: showResults ? 1 : 0.85,
          transition:
            "transform 0.5s cubic-bezier(.68,-0.55,.27,1.55), box-shadow 0.5s cubic-bezier(.68,-0.55,.27,1.55), opacity 0.5s",
          position: "relative" // for absolute positioning of export icon
        }}
      >
        {/* Export icon button at top right */}
        <button
          onClick={handleExport}
          disabled={savedSelections.length === 0}
          title="Export Provider Data by Date Range"
          style={{
            position: "absolute",
            top: "1.5rem",
            right: "1.5rem",
            background: "none",
            border: "none",
            cursor: savedSelections.length === 0 ? "not-allowed" : "pointer",
            padding: 0,
            margin: 0,
            opacity: savedSelections.length === 0 ? 0.5 : 1,
            zIndex: 10
          }}
        >
          {/* Simple download SVG icon */}
          <svg width="26" height="26" viewBox="0 0 20 20" fill="none">
            <circle cx="10" cy="10" r="10" fill="#45eb69"/>
            <path d="M10 5v7m0 0l-3-3m3 3l3-3M5 15h10" stroke="#22223b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        {/* Enhanced Export dialog popup */}
        {exportDialogOpen && (
          <div style={{
            position: "fixed",
            top: 0, left: 0, width: "100vw", height: "100vh",
            background: "rgba(0,0,0,0.25)",
            display: "flex", alignItems: "center", justifyContent: "center",
            zIndex: 2000
          }}>
            <div style={{
              background: "#fff",
              borderRadius: "12px",
              boxShadow: "0 2px 16px rgba(0,0,0,0.13)",
              padding: "2rem 2rem 1.5rem 2rem",
              minWidth: 360,
              maxWidth: 400,
              display: "flex",
              flexDirection: "column",
              gap: "1rem"
            }}>
              <h3 style={{ margin: 0, fontWeight: 700, fontSize: "1.1rem" }}>
                Export Provider Data
              </h3>
              
              <div>
                <label style={{ fontWeight: 500, marginBottom: "0.3rem", display: "block" }}>
                  Vendor (Optional)
                </label>
                <select
                  value={selectedVendor}
                  onChange={e => setSelectedVendor(e.target.value)}
                  style={{ 
                    width: "100%", 
                    padding: "0.5rem",
                    borderRadius: "6px",
                    border: "1px solid #e2e8f0"
                  }}
                >
                  <option value="">All Vendors</option>
                  {uniqueVendors.map((vendor, idx) => (
                    <option key={idx} value={vendor}>{vendor}</option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ fontWeight: 500, marginBottom: "0.3rem", display: "block" }}>
                  Start Date
                </label>
                <input
                  type="date"
                  value={exportStartDate}
                  onChange={e => setExportStartDate(e.target.value)}
                  style={{ 
                    width: "100%", 
                    padding: "0.5rem",
                    borderRadius: "6px",
                    border: "1px solid #e2e8f0"
                  }}
                />
              </div>
              
              <div>
                <label style={{ fontWeight: 500, marginBottom: "0.3rem", display: "block" }}>
                  End Date
                </label>
                <input
                  type="date"
                  value={exportEndDate}
                  min={exportStartDate || ""}
                  onChange={e => setExportEndDate(e.target.value)}
                  style={{ 
                    width: "100%", 
                    padding: "0.5rem",
                    borderRadius: "6px",
                    border: "1px solid #e2e8f0"
                  }}
                />
              </div>

              {selectedVendor && (
                <div style={{ 
                  background: "#f0f9ff", 
                  padding: "0.75rem", 
                  borderRadius: "6px",
                  fontSize: "0.9rem",
                  color: "#0369a1"
                }}>
                  📊 Exporting data for vendor: <strong>{selectedVendor}</strong>
                </div>
              )}

              <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
                <button
                  style={{
                    padding: "0.5rem 1.2rem",
                    background: exportLoading ? "#ccc" : "#45eb69",
                    color: "#22223b",
                    border: "none",
                    borderRadius: "6px",
                    fontWeight: 600,
                    cursor: exportLoading ? "not-allowed" : "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem"
                  }}
                  onClick={handleExportConfirm}
                  disabled={exportLoading || !exportStartDate || !exportEndDate}
                >
                  {exportLoading ? (
                    <>
                      <div style={{
                        width: "14px",
                        height: "14px",
                        border: "2px solid #22223b",
                        borderTop: "2px solid transparent",
                        borderRadius: "50%",
                        animation: "spin 1s linear infinite"
                      }}></div>
                      Exporting...
                    </>
                  ) : (
                    "Download CSV"
                  )}
                </button>
                <button
                  style={{
                    padding: "0.5rem 1.2rem",
                    background: "#eee",
                    color: "#222",
                    border: "none",
                    borderRadius: "6px",
                    fontWeight: 500,
                    cursor: "pointer"
                  }}
                  onClick={() => setExportDialogOpen(false)}
                  disabled={exportLoading}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
        
        {/* Add spinning animation for loading */}
        <style>
          {`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}
        </style>

        <h2
          className="dashboard-result-title"
          style={{
            fontSize: "1.15rem",
            fontWeight: 700,
            marginBottom: "1.2rem",
            color: "#2d3748"
          }}
        >
          Providers & Charges
        </h2>
        {/* Provider selection form moved to top */}
        {selectedProviderIdx !== null && (
          <div
            style={{
              margin: "0 0 1.5rem 0",
              padding: "1rem",
              background: "#f8f9fa",
              borderRadius: "8px",
              boxShadow: "0 1px 4px rgba(0,0,0,0.07)"
            }}
          >
            <div style={{ marginBottom: "0.7rem", fontWeight: 600 }}>
              Add Vendor Name for <span style={{ color: "#007bff" }}>{results[selectedProviderIdx].providerName}</span>
            </div>
            <input
              type="text"
              value={vendorName}
              onChange={e => setVendorName(e.target.value)}
              placeholder="Enter vendor name"
              style={{
                width: "100%",
                padding: "0.5rem",
                borderRadius: "6px",
                border: "1px solid #e2e8f0",
                marginBottom: "0.7rem"
              }}
            />
            <button
              style={{
                padding: "0.5rem 1.2rem",
                background: loading ? "#ccc" : "#22223b",
                color: "#fff",
                border: "none",
                borderRadius: "6px",
                fontWeight: 600,
                cursor: loading ? "not-allowed" : "pointer"
              }}
              onClick={handleSaveSelection}
              disabled={loading || !vendorName.trim()}
            >
              {loading ? "Saving..." : "Save Selection"}
            </button>
          </div>
        )}
        {results.length === 0 ? (
          <div style={{ color: "#888" }}>No results yet. Please calculate to see providers and charges.</div>
        ) : (
          <>
            <ul className="dashboard-result-list" style={{ listStyle: "none", padding: 0 }}>
              {results.map((r, idx) => (
                <li
                  key={idx}
                  className="dashboard-result-card"
                  style={{
                    marginBottom: "1rem",
                    border: "1px solid #e2e8f0",
                    borderRadius: "8px",
                    padding: "1rem",
                    cursor: "pointer",
                    background: expandedIdx === idx ? "#f7fafc" : "#fff",
                    transition: "background 0.2s",
                    boxShadow: selectedProviderIdx === idx ? "0 0 0 2px #007bff" : undefined
                  }}
                  onClick={() => setExpandedIdx(expandedIdx === idx ? null : idx)}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <strong style={{ fontSize: "1.05em" }}>{r.providerName}</strong>
                    <span style={{ fontWeight: 600, color: "#007bff", fontSize: "1.08em" }}>₹{r.total}</span>
                  </div>
                  {expandedIdx === idx && (
                    <div style={{ marginTop: "0.75rem", fontSize: "0.97em", color: "#444" }}>
                      <div>Applicable Weight: {r.applicableWeight} kg</div>
                      <div>Base Cost: ₹{r.baseCost}</div>
                      <div>Fuel Charge: ₹{r.fuelCharge}</div>
                      <div>Docket: ₹{r.docket}</div>
                      <div>COD: ₹{r.codCharge}</div>
                      <div>Holiday: ₹{r.holidayCharge}</div>
                      <div>Outstation: ₹{r.outstationCharge}</div>
                      <button
                        style={{
                          marginTop: "1rem",
                          padding: "0.4rem 1rem",
                          background: "#007bff",
                          color: "#fff",
                          border: "none",
                          borderRadius: "6px",
                          fontWeight: 500,
                          cursor: "pointer"
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleProviderSelect(idx);
                        }}
                      >
                        Select This Provider
                      </button>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
}