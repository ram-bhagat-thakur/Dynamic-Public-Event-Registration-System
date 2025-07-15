import React from 'react'

function Resistrant() {
  return (
    <>
    <div className='mt-20 max-md:mb-20'>
      <h1 className='text-2xl text-center font-bold'>Resistrance  Details</h1><hr />
      
      <div className='flex max-md:w-screen'>
          <table className='w-screen max-md:w-full text-center m-10 max-md:mt-10 max-md:m-0 text-wrap'>
            <thead>
              <tr className='text-2xl max-md:text-sm font-black'>
                <th>S.I.No.</th>
                <th>Name</th>
                <th>Email</th>
                <th>Mobile</th>
                <th>Message</th>
              </tr>
            </thead>
            <tbody className='max-md:text-sm'>
              <tr>
                <th>1</th>
                <th>Rohan Kumar</th>
                <td>example@gmail.com</td>
                <td>1234567890</td>
                <td>Hi i am excited to jooin you!</td>
              </tr>
            </tbody>
          </table>
        </div>
    </div>
    </>
  )
}

export default Resistrant