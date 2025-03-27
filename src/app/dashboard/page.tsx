'use client';
import { useState, ChangeEvent, JSX } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface User {
  id: number;
  name: string;
  email: string;
  obituaryPackage: string;
  paymentDue: string;
  suspended?: boolean;
}

interface Package {
  id: number;
  name: string;
  price: string;
  services: string[];
}

interface GlobalService {
  id: number;
  name: string;
  price: string;
}

export default function Dashboard(): JSX.Element {
  // Tracks which section is active (Dashboard, Users, Settings)
  const [activePage, setActivePage] = useState<string>('dashboard');

  // Users state with suspended property
  const [users, setUsers] = useState<User[]>([
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      obituaryPackage: 'Basic Obituary',
      paymentDue: '$50',
      suspended: false,
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@example.com',
      obituaryPackage: 'Standard Obituary',
      paymentDue: '$75',
      suspended: false,
    },
    {
      id: 3,
      name: 'Bob Johnson',
      email: 'bob@example.com',
      obituaryPackage: 'Premium Obituary',
      paymentDue: '$100',
      suspended: false,
    },
    {
      id: 4,
      name: 'Alice Johnson',
      email: 'alice@example.com',
      obituaryPackage: 'Basic Obituary',
      paymentDue: '$60',
      suspended: false,
    },
    {
      id: 5,
      name: 'Robert Brown',
      email: 'robert@example.com',
      obituaryPackage: 'Standard Obituary',
      paymentDue: '$80',
      suspended: false,
    },
    {
      id: 6,
      name: 'Emily Davis',
      email: 'emily@example.com',
      obituaryPackage: 'Premium Obituary',
      paymentDue: '$110',
      suspended: false,
    },
    {
      id: 7,
      name: 'Michael Wilson',
      email: 'michael@example.com',
      obituaryPackage: 'Basic Obituary',
      paymentDue: '$55',
      suspended: false,
    },
    {
      id: 8,
      name: 'Sarah Lee',
      email: 'sarah@example.com',
      obituaryPackage: 'Standard Obituary',
      paymentDue: '$70',
      suspended: false,
    },
    {
      id: 9,
      name: 'David Martin',
      email: 'david@example.com',
      obituaryPackage: 'Premium Obituary',
      paymentDue: '$90',
      suspended: false,
    },
    {
      id: 10,
      name: 'Jessica White',
      email: 'jessica@example.com',
      obituaryPackage: 'Basic Obituary',
      paymentDue: '$65',
      suspended: false,
    }
  ]);

  // Packages now include a price and a list of services
  const [packages, setPackages] = useState<Package[]>([
    {
      id: 1,
      name: 'Basic Obituary',
      price: '$50',
      services: ['Online Listing', 'Digital Obituary'],
    },
    {
      id: 2,
      name: 'Standard Obituary',
      price: '$75',
      services: ['Online Listing', 'Digital Obituary', 'Printed Notice'],
    },
    {
      id: 3,
      name: 'Premium Obituary',
      price: '$100',
      services: ['Online Listing', 'Digital Obituary', 'Printed Notice', 'Tribute Article'],
    },
  ]);

  // Temporary inputs for adding a new service per package and for updating prices
  const [newService, setNewService] = useState<Record<number, string>>({});
  const [tempPrices, setTempPrices] = useState<Record<number, string>>({});
  // Temporary input for adding a global service
  const [newGlobalService, setNewGlobalService] = useState({ name: '', price: '' });

  // Global services state
  const [globalServices, setGlobalServices] = useState<GlobalService[]>([]);

  // Handlers
  const handlePackageNameChange = (packageId: number, newName: string) => {
    setPackages(prev =>
      prev.map(pkg => pkg.id === packageId ? { ...pkg, name: newName } : pkg)
    );
  };

  const handleAddService = (packageId: number) => {
    if (!newService[packageId]?.trim()) return;
    setPackages(prev =>
      prev.map(pkg =>
        pkg.id === packageId
          ? { ...pkg, services: [...pkg.services, newService[packageId].trim()] }
          : pkg
      )
    );
    setNewService(prev => ({ ...prev, [packageId]: '' }));
  };

  const handleRemoveService = (packageId: number, serviceIndex: number) => {
    setPackages(prev =>
      prev.map(pkg =>
        pkg.id === packageId
          ? { ...pkg, services: pkg.services.filter((_, i) => i !== serviceIndex) }
          : pkg
      )
    );
  };

  const handleSuspend = (userId: number) => {
    setUsers(prev =>
      prev.map(user =>
        user.id === userId ? { ...user, suspended: true } : user
      )
    );
  };

  const handleAddGlobalService = () => {
    if (!newGlobalService.name.trim() || !newGlobalService.price.trim()) return;
    setGlobalServices(prev => [
      ...prev,
      {
        id: prev.length + 1,
        name: newGlobalService.name,
        price: newGlobalService.price
      }
    ]);
    setNewGlobalService({ name: '', price: '' });
  };

  const handleGlobalServiceChange = (serviceId: number, field: 'name' | 'price', value: string) => {
    setGlobalServices(prev =>
      prev.map(service => service.id === serviceId ? { ...service, [field]: value } : service)
    );
  };

  // New handler to update the package price using tempPrices state
  const handlePackagePriceChange = (packageId: number) => {
    if (tempPrices[packageId]?.trim()) {
      setPackages(prev =>
        prev.map(pkg =>
          pkg.id === packageId ? { ...pkg, price: tempPrices[packageId].trim() } : pkg
        )
      );
      setTempPrices(prev => ({ ...prev, [packageId]: '' }));
    }
  };

  // Render content based on activePage
  const renderContent = (): JSX.Element => {
    if (activePage === 'settings') {
      return (
        <div className="p-6">
          <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-8">
            <h2 className="text-3xl font-bold text-[#0B4157] opacity-80 mb-4">Service Details</h2>
            <p className="text-gray-600 opacity-80 mb-6">
              Manage and update your global services. Edit the service name and price directly in the table below or add a new service using the form.
            </p>
            <div className="overflow-x-auto mb-8">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-[#0B4157]">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-medium text-white opacity-90 uppercase">
                      ID
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-white opacity-90 uppercase">
                      Service Name
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-white opacity-90 uppercase">
                      Price
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-white opacity-90 uppercase">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {globalServices.map(service => (
                    <tr key={service.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 opacity-80">
                        {service.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <input
                          type="text"
                          value={service.name}
                          onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            handleGlobalServiceChange(service.id, 'name', e.target.value)
                          }
                          placeholder="Service Name"
                          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#0B4157] text-gray-900 placeholder:text-gray-400"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <input
                          type="text"
                          value={service.price}
                          onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            handleGlobalServiceChange(service.id, 'price', e.target.value)
                          }
                          placeholder="Price"
                          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#0B4157] text-gray-900 placeholder:text-gray-400"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <button className="text-red-500 hover:text-red-700 opacity-80">
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="p-6 bg-gray-100 rounded-lg">
              <h3 className="text-2xl font-semibold text-[#0B4157] opacity-80 mb-4">Add New Service</h3>
              <div className="flex flex-col md:flex-row gap-4 items-center">
                <input
                  type="text"
                  placeholder="Service Name"
                  value={newGlobalService.name}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setNewGlobalService(prev => ({ ...prev, name: e.target.value }))
                  }
                  className="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#0B4157] text-gray-900 placeholder:text-gray-400"
                />
                <input
                  type="text"
                  placeholder="Price"
                  value={newGlobalService.price}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setNewGlobalService(prev => ({ ...prev, price: e.target.value }))
                  }
                  className="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#0B4157] text-gray-900 placeholder:text-gray-400"
                />
                <button
                  onClick={handleAddGlobalService}
                  className="px-6 py-2 bg-[#0B4157] text-white rounded-md hover:bg-[#12171a] opacity-90"
                >
                  Add Service
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    } else if (activePage === 'users') {
      return (
        <div className="p-4">
          <h2 className="text-2xl font-bold text-[#0B4157] mb-4">Users</h2>
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-[#0B4157]">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                    Obituary Package
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                    Payment Due
                  </th>
                  <th className="relative px-6 py-3">
                    <span className="sr-only">Suspend</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {users.map(user => (
                  <tr key={user.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {user.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.obituaryPackage}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.paymentDue}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      {user.suspended ? (
                        <span className="text-green-600 font-medium">Suspended</span>
                      ) : (
                        <button
                          onClick={() => handleSuspend(user.id)}
                          className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                        >
                          Suspend Service
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
    } else {
      // Dashboard view: Obituary Publication Packages with stylish price display and price update box
      return (
        <div>
          <h1 className="text-3xl font-semibold text-[#0B4157] mb-6">
            Dashboard
          </h1>
          <p className="text-gray-600 mb-8">Welcome to your admin dashboard!</p>

          {/* Obituary Publication Packages Section */}
          <section>
            <h2 className="text-2xl font-bold text-[#0B4157] mb-4">
              Obituary Publication Packages
            </h2>
            <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {packages.map(pkg => (
                <div
                  key={pkg.id}
                  className="relative bg-white border border-gray-200 rounded-lg shadow p-4"
                >
                  {/* Stylish Price Badge */}
                  <div className="absolute top-4 right-4">
                    <span className="bg-gradient-to-r from-green-400 to-blue-500 text-white font-bold py-1 px-3 rounded-full shadow-lg">
                      {pkg.price}
                    </span>
                  </div>
                  {/* Package Header with Editable Name */}
                  <div className="mb-4">
                    <input
                      type="text"
                      value={pkg.name}
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        handlePackageNameChange(pkg.id, e.target.value)
                      }
                      className="text-2xl font-medium text-[#0B4157] w-full border-b border-gray-300 focus:outline-none focus:border-[#0B4157]"
                    />
                  </div>
                  {/* List of Services */}
                  <ul className="mb-4 space-y-2">
                    {pkg.services.map((service, index) => (
                      <li key={index} className="flex items-center justify-between">
                        <span className="text-gray-700">{service}</span>
                        <button
                          onClick={() => handleRemoveService(pkg.id, index)}
                          className="text-red-500 hover:text-red-700 text-sm"
                        >
                          Remove
                        </button>
                      </li>
                    ))}
                  </ul>
                  {/* Update Package Price */}
                  <div className="mt-4">
                    <div className="flex items-center space-x-2">
                      <input
                        type="text"
                        placeholder="New Price"
                        value={tempPrices[pkg.id] || ''}
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                          setTempPrices(prev => ({ ...prev, [pkg.id]: e.target.value }))
                        }
                        className="flex-1 border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-[#0B4157] placeholder:text-gray-600"
                      />
                      <button
                        onClick={() => handlePackagePriceChange(pkg.id)}
                        className="py-1 px-3 bg-[#0B4157] text-white rounded hover:bg-[#12171a]"
                      >
                        Update Price
                      </button>
                    </div>
                  </div>
                  {/* Add New Service */}
                  <div className="flex space-x-2 mt-4">
                    <input
                      type="text"
                      placeholder="New service"
                      value={newService[pkg.id] || ''}
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setNewService(prev => ({ ...prev, [pkg.id]: e.target.value }))
                      }
                      className="flex-1 border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-[#0B4157] placeholder:text-gray-600"
                    />
                    <button
                      onClick={() => handleAddService(pkg.id)}
                      className="py-1 px-3 bg-[#0B4157] text-white rounded hover:bg-[#12171a]"
                    >
                      Add
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      );
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-72 bg-[#0B4157] text-white flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <h2 className="text-2xl font-bold">Admin Panel</h2>
          <button>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
        {/* Profile Section */}
        <div className="px-6 py-4 border-b border-gray-700">
          <div className="flex items-center space-x-4">
            <Image src="/avatar.jpg" alt="Admin Avatar" width={40} height={40} className="rounded-full" />
            <div>
              <p className="font-semibold">Admin Name</p>
              <p className="text-sm text-gray-300">Administrator</p>
            </div>
          </div>
        </div>
        {/* Navigation */}
        <nav className="flex-1 px-6 py-4">
          <ul className="space-y-2">
            <li>
              <button
                onClick={() => setActivePage('dashboard')}
                className="flex items-center w-full p-2 rounded-md hover:bg-[#0A3750] transition-colors"
              >
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M13 5v6h6" />
                </svg>
                Dashboard
              </button>
            </li>
            <li>
              <button
                onClick={() => setActivePage('users')}
                className="flex items-center w-full p-2 rounded-md hover:bg-[#0A3750] transition-colors"
              >
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 01-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Users
              </button>
            </li>
            <li>
              <button
                onClick={() => setActivePage('settings')}
                className="flex items-center w-full p-2 rounded-md hover:bg-[#0A3750] transition-colors"
              >
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 010 7.292M12 4v16m0-16a4 4 0 000 7.292" />
                </svg>
                Settings
              </button>
            </li>
          </ul>
        </nav>
        {/* Footer / Logout */}
        <div className="px-6 py-4 border-t border-gray-700">
          <Link href="/login" className="flex items-center p-2 rounded-md hover:bg-[#0A3750] transition-colors">
            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7" />
            </svg>
            Logout
          </Link>
        </div>
      </aside>
  
      {/* Main Content */}
      <main className="flex-1 bg-white p-8 overflow-y-auto">
        {renderContent()}
      </main>
    </div>
  );
}
