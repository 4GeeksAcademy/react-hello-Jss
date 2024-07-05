import React, { useEffect, useState } from "react";

//include images into your bundle

//create your first component
const Home = () => {
	const [listaTarea, setlistaTarea] = useState([]);
	const [tarea, setTarea] = useState("")


	useEffect(() => {
		fetchCreateAgenda()
		fetchGetTask()
	}, [])

	/////////////////////////////////////////////////////

	const fetchCreateAgenda = () =>{
		fetch('https://playground.4geeks.com/contact/agendas/sebas', {
			method: "POST",
			body: JSON.stringify(),
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(response => response.json())
			.then(data => (console.log(data)))
			.catch(error => console.log(error))
	}
	

	/////////////////////////////////////////////////////
	const handleChange = (e) => {
		setTarea(e.target.value)
	}

	const handleKeyEnter = (e) => {
		if (e.code === "Enter") {
			fetchPostTask()
		}
	}

	/////////////////////////////////////////////////////
	const fetchGetTask = () => {
		fetch('https://playground.4geeks.com/contact/agendas/sebas', {
			method: "GET"
		})
			.then(response => response.json())
			.then(data => setlistaTarea(data.contacts))
			.catch(error => console.log(error))
	}
	/////////////////////////////////////////////////////
	const fetchPostTask = () => {

		const nuevaTarea = {

			"name": tarea,
			"phone": "",
			"email": "",
			"address": ""

		}

		fetch('https://playground.4geeks.com/contact/agendas/sebas/contacts', {
			method: "POST",
			body: JSON.stringify(nuevaTarea),
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(response => response.json())
			.then(data => {
				fetchGetTask()
				setTarea("")
			})
			.catch(error => console.log(error))
	}
	/////////////////////////////////////////////////////
	const fetchDeleteTask = (id) => {
		fetch(`https://playground.4geeks.com/contact/agendas/sebas/contacts/${id}`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(response => response)
			.then(data => fetchGetTask())
			.catch(error => console.log(error))
	}


	const tasksLeft = listaTarea.length

	return (
		<div className="baseLista">
			<div className="lista">
				<input type="text" placeholder="Añade tareas" onChange={handleChange} value={tarea} onKeyDown={handleKeyEnter} />
				<div className="pendientes">

					{listaTarea.map((tareaItem, index) => (
						<div className="txt" key={index}>
							<p className="estiloTarea" >{tareaItem.name}</p>
							<button className="delete-button" onClick={() => fetchDeleteTask(tareaItem.id)}>X</button>
						</div>
					))}

				</div>
				<div className="footer">
					{tasksLeft} tarea{tasksLeft !== 1 ? 's' : ''} restantes
				</div>
			</div>
		</div>
	);
};

export default Home;
