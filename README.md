<div align="center">

  # Covaccinate
  ## Website: [covaccinate.tech](https://covaccinate.tech)

  ![Django CI](https://github.com/Saurav-Shrivastav/covaccinate/actions/workflows/ci.yml/badge.svg?branch=main)
  ![Node CI](https://github.com/Saurav-Shrivastav/covaccinate/actions/workflows/node_ci.yml/badge.svg?branch=main)
  [![GitHub issues](https://img.shields.io/github/issues/Saurav-Shrivastav/covaccinate?logo=github)](https://github.com/Saurav-Shrivastav/covaccinate/issues)
  [![Code style: black](https://img.shields.io/badge/code%20style-black-000000.svg)](https://github.com/psf/black)
  ![Size](https://github-size-badge.herokuapp.com/Saurav-Shrivastav/covaccinate.svg)
  [![Website shields.io](https://img.shields.io/website-up-down-green-red/http/shields.io.svg)](http://shields.io/)

  [![Pre-commit](https://img.shields.io/badge/pre--commit-enabled-brightgreen?logo=pre-commit&logoColor=white)](https://github.com/Saurav-Shrivastav/covaccinate/blob/master/.pre-commit-config.yaml)
  [![License](https://img.shields.io/github/license/Saurav-Shrivastav/covaccinate)](https://github.com/Saurav-Shrivastav/covaccinate/blob/master/LICENSE)
  ![GitHub contributors](https://img.shields.io/github/contributors/Saurav-Shrivastav/covaccinate?logo=github)
</div>

India started vaccinating its citizens on 16th January 2021. Thus, a portal named [COWIN](http://cowin.gov.in/) was developed to facilitate the registeration process of vaccination. Only a limited amount of vaccines are given out on a single day, but the number of people that need the vaccine is quite a lot. So, the demand as compared to the supply is very high. Moreover, there is no fixed time for the release of vaccine slots, which means that people have to check the portal regularly to know the availability status in their district.     
[Covacccinate](https://covaccinate.tech) is a service that is built to solve this particular problem. Users can register on the covaccinate website and get vaccine availability notifications directly in their email inbox.   

## Technologies Used
<table>
  <thead align="center">
    <tr>
      <td><strong>Technology</strong></td>
      <td><strong>Use</strong></td>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>React</td>
      <td>Client Side</td>
    </tr>
    <tr>
      <td>Django / Django REST Framework</td>
      <td>Backend API</td>
    </tr>
    <tr>
      <td>Node.js</td>
      <td>Mailer</td>
    </tr>
    <tr>
      <td>Docker and docker-compose</td>
      <td>Containerization</td>
    </tr>
    <tr>
      <td>RabbitMQ</td>
      <td>Messaging Broker</td>
    </tr>
    <tr>
      <td>Firebase</td>
      <td>Used in scraper</td>
    </tr>
    <tr>
      <td>PostgreSQL</td>
      <td>Database</td>
    </tr>
    <tr>
      <td>NGINX</td>
      <td>Reverse Proxy</td>
    </tr>
    <tr>
      <td>Google Cloud Platform</td>
      <td>Deployment</td>
    </tr>
    <tr>
      <td>Git</td>
      <td>Version Control</td>
    </tr>
    <tr>
      <td>GitHub & GitHub Actions</td>
      <td>Remote Code Storage & Continuous Integration</td>
    </tr>
  </tbody>
  
</table>

## Upcoming Features

- Notfications in the browser with FCM

## System Architecture

![System Architecture](/assets/diagram.PNG)


## Installation & How to contribute?
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
Refer to the Contributings.md file.

## License
[GPL-3.0](https://choosealicense.com/licenses/gpl-3.0/)




