import { DetachedRouteHandle, RouteReuseStrategy } from '@angular/router';

export class CustomReuseStrategy implements RouteReuseStrategy {
  shouldReuseRoute(): boolean {
    return false;
  }

  store(): void {
    //method not needed
  }

  retrieve(): DetachedRouteHandle | null {
    return null;
  }

  shouldAttach(): boolean {
    return false;
  }

  shouldDetach(): boolean {
    return false;
  }
}
