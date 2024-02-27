import { createBrowserRouter } from "react-router-dom"
import Layout from "../Pages/Layout"
import Home from "../components/About"
import Projects from "../components/Projects"
import Sert from "../components/Sertificates"
import Education from "../components/Education"
import Skills from "../components/Skills"
import ErrorPage from "../Pages/404"
import Todo from "../components/Write"
import Read from "../components/Read"
import Edit from "../components/Edit"

const Router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: "projects",
                element: <Projects />
            },
            {
                path: "sertificates",
                element: <Sert />
            },
            {
                path: "education",
                element: <Education />
            },
            {
                path: "skills",
                element: <Skills />
            },
            {
                path: "write",
                element: <Todo />
            },
            {
                path: "read",
                element: <Read />
            },
            {
                path: "edit",
                element: <Edit />
            }
        ]
    },
    {
        path: "*",
        element: <ErrorPage />
    }
])

export default Router