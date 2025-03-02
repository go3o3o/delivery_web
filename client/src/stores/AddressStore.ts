import { action, observable, computed } from "mobx";

class AddressStore {
  @observable lat = null;
  @observable lng = null;

  @action
  setCoordinate(lat: number, lng: number) {
    this.lat = lat;
    this.lng = lng;
  }
}

export default AddressStore;
