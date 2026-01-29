import { Input } from "../component/input";
import Header from "../layouts/Header";
import Footer from "../layouts/Footer";
function Profile() {
  return (
    <div>
      <Header bgColor="bg-black" />

      <div className="flex flex-row pt-20 justify-center">
        <div className="flex flex-col items-center bg-white p-8 rounded-lg shadow-md min-w-[250px] flex-1">
          <span>Ghaluh Wizard</span>
          <button>Upload New Photo</button>
          <span>Since 20 January 2022</span>
        </div>
        <div className="flex flex-col items-center bg-white p-8 rounded-lg shadow-md min-w-[250px] flex-1">
          <div className="mb-2">
            <Input
              label="Full Name"
              type="email"
              id="email"
              name="email"
              placeholder="Enter Your Email"
              required
              iconAlt="Email Icon"
            />
          </div>
          <div className="mb-2">
            <Input
              label="Email"
              type="email"
              id="email"
              name="email"
              placeholder="Enter Your Email"
              required
              iconAlt="Email Icon"
            />
          </div>
          <div className="mb-2">
            <Input
              label="Phone"
              type="email"
              id="email"
              name="email"
              placeholder="Enter Your Email"
              required
              iconAlt="Email Icon"
            />
          </div>
          <div className="mb-2">
            <Input
              label="Password"
              type="email"
              id="email"
              name="email"
              placeholder="Enter Your Email"
              required
              iconAlt="Email Icon"
            />
          </div>
          <div className="mb-2">
            <Input
              label="Address"
              type="email"
              id="email"
              name="email"
              placeholder="Enter Your Email"
              required
              iconAlt="Email Icon"
            />
          </div>
          <button>Submit</button>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Profile;
