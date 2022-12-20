  <footer class="main-footer">
    <strong>Copyright &copy; 2019-2022 
      @if (Auth::user()->level === 'user')
        <a href="{{ route('dashboard') }}">Muhammad Ferdinansyah Arighi</a>.
      @else
        <a href="{{ route('dashboard_admin') }}">Muhammad Ferdinansyah Arighi</a>.
      @endif
    </strong>
    All rights reserved.
    <div class="float-right d-none d-sm-inline-block">
      <b>Version</b> 1.0.0
    </div>
  </footer>