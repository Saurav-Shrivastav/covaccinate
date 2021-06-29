const ejsTemplate = `
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN" "http://www.w3.org/TR/REC-html40/loose.dtd">
<html lang="en">
  <head> </head>
  <body>
  <h3>Here is the list of vaccine slots available in your district.</h3>
  <p>Visit <a href="https://www.cowin.gov.in/home" >CoWIN</a> for more details and register for vaccine.</p>
  <p></p>
    <table
      style="
        width: 100%;
        border-collapse: collapse;
        font-family: arial, sans-serif;
      "
    >
      <thead>
        <tr>
          <th style="border: 1px solid black; text-align: center; padding: 5px">
            S.No.
          </th>
          <th
            style="
              border: 1px solid black;
              text-align: center;
              padding: 5px;
              background-color: lightgray;
            "
          >
            Name
          </th>
          <th style="border: 1px solid black; text-align: center; padding: 5px">
            Date
          </th>
          <th
            style="
              border: 1px solid black;
              text-align: center;
              padding: 5px;
              background-color: lightgray;
            "
          >
            Slots
          </th>
          <th style="border: 1px solid black; text-align: center; padding: 5px">
            Vaccine
          </th>
          <th
            style="
              border: 1px solid black;
              text-align: center;
              padding: 5px;
              background-color: lightgray;
            "
          >
            Availability
          </th>
          <th style="border: 1px solid black; text-align: center; padding: 5px">
            Address
          </th>
          <th
            style="
              border: 1px solid black;
              text-align: center;
              padding: 5px;
              background-color: lightgray;
            "
          >
            Block Name
          </th>
          <th style="border: 1px solid black; text-align: center; padding: 5px">
            Fee Type
          </th>
          <th
            style="
              border: 1px solid black;
              text-align: center;
              padding: 5px;
              background-color: lightgray;
            "
          >
            Minimum Age
          </th>
        </tr>
      </thead>
      <tbody>
        <% data.forEach((hospital, index) => { %>
          <tr>
            <td
              style="
                border: 1px solid black;
                text-align: center;
                padding: 5px;
                background-color: lightgray;
              " 
              rowspan=<%= hospital.slots.length %> > 
              <%= index + 1 %> 
            </td>
            <td
              style="
                border: 1px solid black;
                text-align: center;
                padding: 5px;
              " 
              rowspan=<%= hospital.slots.length %> > 
              <%= hospital.name %> 
            </td>
            <td
              style="
                border: 1px solid black;
                text-align: center;
                padding: 5px;
                background-color: lightgray;
              " 
              rowspan=<%= hospital.slots.length %> > 
              <%= hospital.date %> 
            </td>
            <td
              style="
                border: 1px solid black;
                text-align: center;
                padding: 5px;
              "
            >
              <%= hospital.slots[0] %> 
            </td>
            <td
              style="
                border: 1px solid black;
                text-align: center;
                padding: 5px;
                background-color: lightgray;
              " 
              rowspan=<%= hospital.slots.length %> > 
              <%= hospital.vaccine %> 
            </td>
            <td
              style="
                border: 1px solid black;
                text-align: center;
                padding: 5px;
              " 
              rowspan=<%= hospital.slots.length %> > 
              <%= hospital.availability %> 
            </td>
            <td
              style="
                border: 1px solid black;
                text-align: center;
                padding: 5px;
                background-color: lightgray;
              " 
              rowspan=<%= hospital.slots.length %> > 
              <%= hospital.address %> 
            </td>
            <td
              style="
                border: 1px solid black;
                text-align: center;
                padding: 5px;
              " 
              rowspan=<%= hospital.slots.length %> > 
              <%= hospital.block_name %> 
            </td>
            <td
              style="
                border: 1px solid black;
                text-align: center;
                padding: 5px;
                background-color: lightgray;
              " 
              rowspan=<%= hospital.slots.length %> > 
              <%= hospital.fee_type %> 
            </td>
            <td
              style="
                border: 1px solid black;
                text-align: center;
                padding: 5px;
              " 
              rowspan=<%= hospital.slots.length %> > 
              <%= hospital.min_age_limit %> 
            </td>
          </tr>

          <% hospital.slots.slice(1).forEach((slot) => { %>
              <tr>
                <td
                style="
                  border: 1px solid black;
                  text-align: center;
                  padding: 5px;
                "
              >
                  <%= slot %> 
                </td>
              </tr>
          <% }) %>
        <% }) %>
      </tbody>
    </table>
  </body>
</html>
`;

export default ejsTemplate;
