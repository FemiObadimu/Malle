import React, { Fragment, useContext, useState, useEffect } from "react";
import Loading from "./Loading";
import Logo from "../images/logo.png";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { BellIcon, MenuIcon, XIcon } from "@heroicons/react/outline";
import AuthContext from "../context/auth/authContext";
import UserContext from "../context/users/userContext";
import Time from "./Time";
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Home = () => {
  const [loading, setLoading] = useState(true);
  setTimeout(() => {
    setLoading(false);
  }, 2000);

  const hoursMinSecs = { hours: 0, minutes: 10, seconds: 0 };

  const authContext = useContext(AuthContext);
  const userContext = useContext(UserContext);
  const { user, logOut } = authContext;
  const {
    users1,
    getUsers1,
    singleUser,
    removeUser,
    current,
    createUser,
    currentUser,
    clearCurrentUser,
    updateUser,
  } = userContext;

  useEffect(() => {
    if (current !== null) {
      setCreateuser(current);
    } else {
      setCreateuser({
        name: "",
        job: "",
      });
    }

    getUsers1();

    // eslint-disable-next-line
  }, [singleUser, current]);

  const onDelete = (id) => {
    removeUser(id);
    clearCurrentUser();
  };

  const onEdit = (person) => {
    currentUser(person);
  };

  const [createuser, setCreateuser] = useState({
    name: "",
    job: "",
  });

  const { name, job } = createuser;

  const onChange = (e) => {
    setCreateuser({ ...createuser, [e.target.name]: e.target.value });
  };

  const onCreate = (e) => {
    e.preventDefault();

    if (name === "" || job === "") {
      toast.error("Enter All Fields!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
      });
    } else if (current === null) {
      createUser({
        name,
        job,
      });
      setCreateuser({
        name: "",
        job: "",
      });
    } else {
      updateUser(
        createUser({
          name,
          job,
        })
      );
      clearCurrentUser();
    }
  };

  const onUpdate = (e) => {
    e.preventDefault();

    updateUser(
      createUser({
        name,
        job,
      })
    );

    clearCurrentUser();
  };

  const onClearAll = (e) => {
    e.preventDefault();

    clearCurrentUser();
  };

  return (
    <div>
      {loading ? (
        <div>
          <Loading />
        </div>
      ) : (
        <div>
          {/* ================================================NAVBAR====================================================== */}
          <Disclosure as="nav" className="bg-white shadow">
            {({ open }) => (
              <>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="flex justify-between h-16">
                    <div className="flex-shrink-0 flex items-center">
                      <img
                        className="block lg:hidden h-8 w-auto"
                        src={Logo}
                        alt="Malle"
                      />
                      <img
                        className="hidden lg:block h-8 w-auto"
                        src={Logo}
                        alt="Malle"
                      />
                      <h1 className="text-gray-600 font-bold text-2xl">
                        {" "}
                        Malle...
                      </h1>
                    </div>
                    <div className="flex">
                      <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                        <Link
                          to="/home"
                          className="border-indigo-500 text-gray-500 inline-flex items-center px-1 pt-1 border-b-2 text-base font-bold"
                        >
                          Users
                        </Link>
                      </div>
                    </div>
                    <div className="hidden sm:ml-6 sm:flex sm:items-center">
                      {/* Profile dropdown */}
                      <Menu as="div" className="ml-3 relative">
                        <div className="flex justify-evenly items-center px-4">
                          <div>
                            <Menu.Button className="bg-white rounded-full flex text-sm focus:outline-none ">
                              <span className="sr-only">Open user menu</span>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 text-gray-500"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                              </svg>
                            </Menu.Button>
                          </div>
                          <div>
                            <h1 className="text-base font-bold text-gray-500">
                              Malle User Token <br /> {user && user.token}
                            </h1>
                          </div>
                        </div>
                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-200"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <Menu.Item>
                              {({ active }) => (
                                <Link
                                  to="/settings"
                                  className={classNames(
                                    active ? "bg-gray-100" : "",
                                    "block px-4 py-2 text-sm text-gray-700"
                                  )}
                                >
                                  My Account Settings
                                </Link>
                              )}
                            </Menu.Item>
                            <Menu.Item onClick={() => logOut}>
                              {({ active }) => (
                                <a
                                  href="/"
                                  className={classNames(
                                    active ? "bg-gray-100" : "",
                                    "block px-4 py-2 text-sm text-gray-700"
                                  )}
                                >
                                  LogOut
                                </a>
                              )}
                            </Menu.Item>
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    </div>
                    <div className="-mr-2 flex items-center sm:hidden">
                      {/* Mobile menu button */}
                      <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                        <span className="sr-only">Open main menu</span>
                        {open ? (
                          <XIcon className="block h-6 w-6" aria-hidden="true" />
                        ) : (
                          <MenuIcon
                            className="block h-6 w-6"
                            aria-hidden="true"
                          />
                        )}
                      </Disclosure.Button>
                    </div>
                  </div>
                </div>

                <Disclosure.Panel className="sm:hidden">
                  <div className="pt-2 pb-3 space-y-1">
                    {/* Current: "bg-indigo-50 border-indigo-500 text-indigo-700", Default: "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700" */}
                  </div>
                  <div className="pt-4 pb-3 border-t border-gray-200">
                    <div className="flex items-center px-4">
                      <div className="ml-3">
                        <div className="text-base font-bold text-gray-500 flex justify-evenly items-center">
                          <div>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-6 w-6 text-gray-500"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={2}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                          </div>
                          <div>
                            {" "}
                            Malle User Token <br /> {user && user.token}
                          </div>
                        </div>
                      </div>
                      <button
                        type="button"
                        className="ml-auto flex-shrink-0 bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        <span className="sr-only">View notifications</span>
                        <BellIcon className="h-6 w-6" aria-hidden="true" />
                      </button>
                    </div>
                    <div className="mt-3 space-y-1">
                      <Disclosure.Button
                        as="a"
                        href="/home"
                        className="block px-4 py-2 text-base font-bold text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                      >
                        <div className=" text-base font-bold text-gray-500 py-4">
                          Users
                        </div>
                      </Disclosure.Button>
                      <Link
                        as=""
                        to="/settings"
                        className="block px-4 py-2 text-base font-bold text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                      >
                        <div>My Account Settings</div>
                      </Link>

                      <Disclosure.Button
                        as="a"
                        onClick={logOut}
                        href="/"
                        className="block px-4 py-2 text-base font-bold text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                      >
                        LogOut
                      </Disclosure.Button>
                    </div>
                  </div>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
          <main>
            <ToastContainer
              position="top-right"
              autoClose={2000}
              hideProgressBar={true}
              newestOnTop={false}
              closeOnClick
            />
            <div className="px-4 sm:px-6 lg:px-8">
              <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                  <h1 className="text-2xl text-center font-semibold text-gray-500">
                    {user && user.token ? (
                      <div>
                        Your Token <br />
                        <span className="text-indigo-600">
                          {" "}
                          {user && user.token}{" "}
                        </span>
                        Ends in <br />
                        {user && user.token ? (
                          <Time hoursMinSecs={hoursMinSecs} />
                        ) : (
                          <div>-------</div>
                        )}
                      </div>
                    ) : (
                      <div>No Token</div>
                    )}
                    <br />
                  </h1>
                </div>
              </div>

              <div>
                <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
                  <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <img
                      className="mx-auto h-12 w-auto"
                      src={Logo}
                      alt="Malle"
                    />
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-500">
                      Malle...
                    </h2>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-600">
                      {current ? "Update A User" : "Create A User"}
                    </h2>
                  </div>

                  <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                      <form className="space-y-6" autoComplete="off">
                        <div>
                          <label
                            htmlFor="name"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Full Name
                          </label>
                          <div className="mt-1 cursor-pointer">
                            <input
                              onChange={onChange}
                              id="name"
                              name="name"
                              type="text"
                              value={name}
                              autoComplete="off"
                              required
                              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                          </div>
                        </div>

                        <div>
                          <label
                            htmlFor="job"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Job
                          </label>
                          <div className="mt-1 relative rounded-md shadow-sm cursor-pointer">
                            <input
                              onChange={onChange}
                              type="text"
                              name="job"
                              id="job"
                              required
                              value={job}
                              autoComplete="off"
                              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                              aria-describedby=""
                            />
                          </div>
                        </div>

                        <div>
                          {current ? (
                            <button
                              type="submit"
                              onClick={onUpdate}
                              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                              Update User
                            </button>
                          ) : (
                            <button
                              type="submit"
                              onClick={onCreate}
                              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                              Create User
                            </button>
                          )}

                          {current && (
                            <button
                              type="submit"
                              onClick={onClearAll}
                              className="w-full my-3 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                            >
                              Clear All
                            </button>
                          )}
                        </div>
                      </form>

                      <div className="mt-6">
                        <div className="relative">
                          <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300" />
                          </div>
                          <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-white text-gray-500">
                              Malle Inc.
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                  <h1 className="text-xl text-center font-semibold text-gray-500">
                    Users
                  </h1>
                  <p className="mt-2 text-center text-sm text-gray-500">
                    A list of all the users in your account including their
                    name, Job role.
                  </p>
                </div>
              </div>
              <div className="mt-8 flex flex-col">
                <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                    <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                      <table className="min-w-full divide-y divide-gray-300">
                        <thead className="bg-gray-50">
                          <tr>
                            <th
                              scope="col"
                              className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                            >
                              Name
                            </th>

                            <th
                              scope="col"
                              className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                            >
                              Job Role
                            </th>
                            <th
                              scope="col"
                              className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                            >
                              <span className="sr-only">Edit</span>
                            </th>
                            <th
                              scope="col"
                              className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                            >
                              <span className="sr-only">Delete</span>
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white">
                          {singleUser.length > 0 ? (
                            singleUser.map((person) => (
                              <tr key={person.id}>
                                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                  {person.name}
                                </td>

                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                  {person.job}
                                </td>
                                <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                  <span
                                    onClick={() => onEdit(person)}
                                    className="text-indigo-600 hover:text-indigo-900"
                                  >
                                    Edit
                                  </span>
                                </td>
                                <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                  <span
                                    onClick={() => onDelete(person.id)}
                                    className="text-indigo-600 hover:text-indigo-900"
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      className="h-6 w-6"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke="currentColor"
                                      strokeWidth={2}
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                      />
                                    </svg>
                                  </span>
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td></td>
                              <td>
                                <div className="mt-2 text-center flex justify-center items-center text-2xl py-4 text-gray-700">
                                  <div>
                                    <h2>No User, Kindly Create a User</h2>
                                  </div>
                                </div>
                              </td>
                              <td></td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white">
              <div className="max-w-7xl mx-auto py-12 px-4 text-center sm:px-6 lg:px-8 lg:py-24">
                <div className="space-y-12">
                  <div className="space-y-5 sm:mx-auto sm:max-w-xl sm:space-y-4 lg:max-w-5xl">
                    <h2 className="text-3xl text-gray-500 font-extrabold tracking-tight sm:text-4xl">
                      Get Endpoint for all Users
                      <br /> Meet our Malle Users
                    </h2>
                    <p className="text-xl text-gray-500">
                      Ornare sagittis, suspendisse in hendrerit quis. Sed dui
                      aliquet lectus sit pretium egestas vel mattis neque.
                    </p>
                  </div>
                  <ul className="mx-auto space-y-16 sm:grid sm:grid-cols-2 sm:gap-16 sm:space-y-0 lg:grid-cols-3 lg:max-w-5xl">
                    {users1 &&
                      users1.data.map((person) => (
                        <li key={person.id}>
                          <div className="space-y-6">
                            <img
                              className="mx-auto h-40 w-40 rounded-full xl:w-56 xl:h-56"
                              src={person.avatar}
                              alt="Malle"
                            />
                            <div className="space-y-2">
                              <div className="text-lg leading-6 font-medium space-y-1">
                                <h3>
                                  {person.first_name} {person.last_name}
                                </h3>
                                <p className="text-gray-600">{person.email}</p>
                              </div>
                              {/* <ul className="flex justify-evenly space-x-5">
                                <li>
                                  <a
                                    href={person.twitterUrl}
                                    className="text-gray-400 hover:text-gray-500"
                                  >
                                    <span className="sr-only">Edit</span>
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      className="h-6 w-6"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke="currentColor"
                                      strokeWidth={2}
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                      />
                                    </svg>
                                  </a>
                                </li>
                                <li>
                                  <a
                                    href={person.linkedinUrl}
                                    className="text-gray-400 hover:text-gray-500"
                                  >
                                    <span className="sr-only">Delete</span>
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      className="h-6 w-6"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke="currentColor"
                                      strokeWidth={2}
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                      />
                                    </svg>
                                  </a>
                                </li>
                              </ul> */}
                            </div>
                          </div>
                        </li>
                      ))}
                  </ul>
                </div>
              </div>
            </div>
          </main>
        </div>
      )}
    </div>
  );
};

export default Home;
